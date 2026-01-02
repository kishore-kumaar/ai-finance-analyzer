import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// 🔹 Reusable card style
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
  backgroundColor: "#fafafa",
};

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const [monthSummary, setMonthSummary] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // 🔹 Fetch all expenses (used only for list display)
  useEffect(() => {
    const fetchExpenses = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/expenses/${userId}`
        );
        setExpenses(res.data);
      } catch (error) {
        console.log("Error fetching expenses");
      }
    };

    fetchExpenses();
  }, []);

  // 🔹 Fetch month-wise summary
  const fetchMonthSummary = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/summary/${userId}/${selectedYear}/${selectedMonth}`
      );
      setMonthSummary(res.data);
    } catch (error) {
      console.log("Error fetching month summary");
    }
  };

  // 🔹 Fetch AI insights (month-aware)
  const fetchInsights = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/insights/${userId}`,
        {
          params: {
            year: selectedYear,
            month: selectedMonth,
          },
        }
      );
      setInsights(res.data.insights);
    } catch (error) {
      console.log("Error fetching AI insights");
    }
  };

  // 🔹 Trigger summary + AI insights when month/year changes
  useEffect(() => {
    fetchMonthSummary();
    fetchInsights();
  }, [selectedMonth, selectedYear]);

  // 🔹 Month-aware pie chart data (with fallback)
  const categoryData =
    monthSummary &&
    Object.keys(monthSummary.categoryTotals).length > 0
      ? Object.entries(monthSummary.categoryTotals).map(
          ([category, amount]) => ({
            name: category,
            value: amount,
          })
        )
      : [
          {
            name: "No data",
            value: 1,
          },
        ];

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Dashboard
      </h2>

      {/* Month Selector */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(Number(e.target.value))
          }
          style={{ marginRight: "10px", padding: "6px" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(Number(e.target.value))
          }
          style={{ padding: "6px", width: "90px" }}
        />
      </div>

      <p style={{ textAlign: "center", color: "#555" }}>
        Showing data for{" "}
        <strong>
          {new Date(selectedYear, selectedMonth).toLocaleString(
            "default",
            { month: "long", year: "numeric" }
          )}
        </strong>
      </p>

      {/* Month Summary */}
      {monthSummary && (
        <div style={cardStyle}>
          <h3>Month-wise Summary</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <div>
              <strong>Total Income</strong>
              <p>₹{monthSummary.totalIncome}</p>
            </div>
            <div>
              <strong>Total Expense</strong>
              <p>₹{monthSummary.totalExpense}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pie Chart */}
      <div style={cardStyle}>
        <h3>Spending Breakdown</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={400} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* AI Insights */}
      <div style={cardStyle}>
        <h3>
          AI Spending Insights (
          {new Date(selectedYear, selectedMonth).toLocaleString(
            "default",
            { month: "long", year: "numeric" }
          )}
          )
        </h3>

        {insights.length === 0 ? (
          <p>No insights available for this period.</p>
        ) : (
          <ul>
            {insights.map((insight, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                {insight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Expense List */}
      <div style={cardStyle}>
        <h3>All Transactions</h3>
        {expenses.length === 0 ? (
          <p>No transactions added yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li key={exp._id} style={{ marginBottom: "6px" }}>
                {exp.title} – ₹{exp.amount} (
                {new Date(exp.date).toDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

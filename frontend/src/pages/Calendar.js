import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔹 Reusable card style
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "20px",
  backgroundColor: "#fafafa",
};

function Calendar() {
  const navigate = useNavigate();

  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayTransactions, setDayTransactions] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 🔹 Fetch transactions for a selected day
  const fetchDayTransactions = async (date) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/expenses/${userId}`
      );

      const selectedDayString = date.toDateString();

      const filtered = res.data.filter(
        (tx) =>
          new Date(tx.date).toDateString() === selectedDayString
      );

      setDayTransactions(filtered);
    } catch (error) {
      console.log("Error fetching day transactions");
    }
  };

  const handleDateClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    fetchDayTransactions(date);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        {currentDate.toLocaleString("default", {
          month: "long",
        })}{" "}
        {year}
      </h2>

      {/* Calendar Card */}
      <div style={cardStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
          }}
        >
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div
              key={i}
              onClick={() => handleDateClick(i + 1)}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  selectedDate &&
                  selectedDate.getDate() === i + 1
                    ? "#cceeff"
                    : "#fff",
                fontWeight:
                  selectedDate &&
                  selectedDate.getDate() === i + 1
                    ? "bold"
                    : "normal",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Day-wise Transactions */}
      {selectedDate && (
        <div style={cardStyle}>
          <h3>
            Transactions on{" "}
            <span style={{ color: "#555" }}>
              {selectedDate.toDateString()}
            </span>
          </h3>

          {dayTransactions.length === 0 ? (
            <p>No transactions for this day.</p>
          ) : (
            <ul>
              {dayTransactions.map((tx) => (
                <li
                  key={tx._id}
                  style={{ marginBottom: "8px" }}
                >
                  <strong>{tx.title}</strong> – ₹{tx.amount} (
                  {tx.type})
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() =>
                navigate("/add", {
                  state: { selectedDate },
                })
              }
              style={{ marginRight: "10px" }}
            >
              Add Expense / Income
            </button>

            <button
              onClick={() =>
                navigate("/manage", {
                  state: {
                    selectedDate,
                    transactions: dayTransactions,
                  },
                })
              }
            >
              Manage Transactions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;

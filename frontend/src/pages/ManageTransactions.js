import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../config";


// 🔹 Reusable card style
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "15px",
  backgroundColor: "#fafafa",
};

function ManageTransactions() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedDate = location.state?.selectedDate;
  const [transactions, setTransactions] = useState(
    location.state?.transactions || []
  );

  if (!selectedDate) {
    return <p>No date selected.</p>;
  }

  const deleteTransaction = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this transaction?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
  `${API_BASE_URL}/api/expenses/${id}`

      );

      setTransactions((prev) =>
        prev.filter((tx) => tx._id !== id)
      );
    } catch (error) {
      alert("Error deleting transaction");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Manage Transactions
      </h2>

      <p style={{ textAlign: "center", color: "#555" }}>
        {new Date(selectedDate).toDateString()}
      </p>

      {transactions.length === 0 ? (
        <div style={cardStyle}>
          <p>No transactions for this day.</p>
        </div>
      ) : (
        transactions.map((tx) => (
          <div key={tx._id} style={cardStyle}>
            <h4 style={{ marginBottom: "5px" }}>
              {tx.title}
            </h4>

            <p style={{ margin: "5px 0" }}>
              Amount: <strong>₹{tx.amount}</strong>
            </p>

            <p style={{ margin: "5px 0" }}>
              Category: {tx.category}
            </p>

            <p style={{ margin: "5px 0" }}>
              Type:{" "}
              <strong>
                {tx.type === "expense"
                  ? "Expense"
                  : "Income"}
              </strong>
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() =>
                  navigate("/edit", {
                    state: { transaction: tx },
                  })
                }
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTransaction(tx._id)}
                style={{
                  backgroundColor: "#ffdddd",
                  border: "1px solid #ff9999",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() =>
            navigate("/add", {
              state: { selectedDate },
            })
          }
        >
          Add Expense / Income
        </button>
      </div>
    </div>
  );
}

export default ManageTransactions;

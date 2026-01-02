import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Handle date from calendar OR manual entry
  const initialDate = location.state?.selectedDate
  ? new Date(
      location.state.selectedDate.getTime() -
        location.state.selectedDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0]
  : "";


  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(initialDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      await axios.post("http://localhost:5000/api/expenses", {
        title,
        amount,
        category,
        type,
        date,
        user: userId,
      });

      alert("Transaction added successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Error adding transaction");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Expense / Income</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Amount</label>
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
  <label>Category</label>
  <br />
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="">Select category</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Shopping">Shopping</option>
    <option value="Rent">Rent</option>
    <option value="Bills">Bills</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Other">Other</option>
  </select>
</div>


        <div style={{ marginBottom: "10px" }}>
          <label>Type</label>
          <br />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Date</label>
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddExpense;

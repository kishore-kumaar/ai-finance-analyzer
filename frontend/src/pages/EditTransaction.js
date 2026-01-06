import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";


function EditTransaction() {
  const navigate = useNavigate();
  const location = useLocation();

  const transaction = location.state?.transaction;

  const [title, setTitle] = useState(transaction?.title || "");
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [type, setType] = useState(transaction?.type || "expense");

  if (!transaction) {
    return <p>No transaction selected.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
  `${API_BASE_URL}/api/expenses/${transaction._id}`,
  {
    title,
    amount,
    category,
    type,
  }
);

      alert("Transaction updated successfully");
      navigate(-1); // go back
    } catch (error) {
      alert("Error updating transaction");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Transaction</h2>

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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
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

        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
}

export default EditTransaction;

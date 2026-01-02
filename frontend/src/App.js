import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Calendar from "./pages/Calendar";
import ManageTransactions from "./pages/ManageTransactions";
import EditTransaction from "./pages/EditTransaction";




function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <nav style={{ marginBottom: "20px" }}>
  <Link to="/login">Login</Link> |{" "}
  <Link to="/register">Register</Link> |{" "}
  <Link to="/add">Add Expense</Link> |{" "}
  <Link to="/dashboard">Dashboard</Link> |{" "}
  <Link to="/calendar">Calendar</Link> |{" "}
  <button
    onClick={() => {
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
</nav>



        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  path="/add"
  element={
    <ProtectedRoute>
      <AddExpense />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage"
  element={
    <ProtectedRoute>
      <ManageTransactions />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit"
  element={
    <ProtectedRoute>
      <EditTransaction />
    </ProtectedRoute>
  }
/>



        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("userId", res.data.userId);
      alert("Login successful");
      navigate("/add");

    } catch (error) {
  alert(
    error.response?.data?.message || "Something went wrong. Please try again."
  );
}

  };

  return (
  <div style={{ maxWidth: "400px", margin: "auto" }}>
    <h2>Login</h2>
    <form onSubmit={submitHandler}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button style={{ width: "100%", padding: "10px" }}>
        Login
      </button>
    </form>
  </div>
);

}

export default Login;

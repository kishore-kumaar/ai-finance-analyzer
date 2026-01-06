import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        { name, email, password }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
  <div style={{ maxWidth: "400px", margin: "auto" }}>
    <h2>Register</h2>
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

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
        Register
      </button>
    </form>
  </div>
);

}

export default Register;

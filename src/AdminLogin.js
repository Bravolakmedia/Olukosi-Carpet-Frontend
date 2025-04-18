import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Make sure this path matches your file structure

const AdminLogin = ({ setAdminToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await fetch("https://olukosi-carpets.onrender.com/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Admin login failed");
      }

      localStorage.setItem("adminToken", data.token);
      setAdminToken(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login failed", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="admin-input"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"
        />
        <button className="admin-login-button" onClick={loginAdmin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

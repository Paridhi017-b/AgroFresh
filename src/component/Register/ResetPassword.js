import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ResetPassword.css"; // Make sure to create/import this CSS file


function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <div className="reset-logo">
          <img src="/logo.jpg" alt="Logo" />
        </div>
        <h2>Reset your password</h2>
        <p>Please enter a new password below to reset your account.</p>
        <form onSubmit={handleSubmit} className="reset-form">
          <label htmlFor="password">New Password</label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              title="Toggle Password Visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">Reset Password</button>
          {msg && <p className="reset-message">{msg}</p>}
        </form>
        <div className="back-link">
          <Link to="/signin">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

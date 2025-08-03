import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-box">
        <img src="/logo.jpg" alt="AgroFresh" className="forgot-logo" />
        <h1 className="forgot-title">Forgot your password</h1>
        <p className="forgot-subtext">
          Please enter the email address you'd like your password reset information sent to
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="forgot-label">Enter email address</label>
          <input
            id="email"
            type="email"
            className="forgot-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-button">Request reset link</button>
          {msg && <p className="forgot-msg">{msg}</p>}
        </form>
        <Link to="/signin" className="forgot-login-link">
         Back To Login
        </Link>
      </div>
      <footer className="forgot-footer">English ⌄</footer>
    </div>
  );
}

export default ForgotPassword;

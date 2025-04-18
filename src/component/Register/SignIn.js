import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Store user data in localStorage
    const userData = {
      email,
      name: email.split('@')[0] || 'User',
      memberSince: new Date().toLocaleDateString()
    };
    localStorage.setItem('farmerData', JSON.stringify(userData));

    // Redirect to products page or intended destination
    const from = location.state?.from?.pathname || '/products';
    navigate(from);
  };

  return (
    <div className="signin-container">
      <div className="signin-overlay">
        <div className="signin-box">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="ForgotPassword">
              <a href="/ForgotPassword">Forgot Password?</a>
            </p>

            <button type="submit" className="signin-btn">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
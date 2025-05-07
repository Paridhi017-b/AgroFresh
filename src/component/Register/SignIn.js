import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Replace localhost with your deployed backend URL before deploying
      const res = await axios.post("http://localhost:5000/signin", {
        email,
        password
      });

      if (res.data.success) {
        // Login successful – no localStorage used
        const from = location.state?.from?.pathname || "/products";
        navigate(from);
      } else {
        setError("Invalid email or password");
      }

    } catch (err) {
      console.error(err);
      setError("Login failed. Server error.");
    }
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
            <p className="ForgotPassword"><a href="/ForgotPassword">Forgot Password?</a></p>
            <button type="submit" className="signin-btn">Login</button>
          </form>
          <p className="signup-link">Don't have an account? <a href="/signup">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
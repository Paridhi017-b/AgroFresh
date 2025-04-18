import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Store user data in localStorage
    const userData = {
      email,
      name,
      memberSince: new Date().toLocaleDateString()
    };
    localStorage.setItem('farmerData', JSON.stringify(userData));

    navigate("/products");
  };
  
  return (
   
    <div className="signin-container">
      <div className="signin-overlay">
        <div className="signin-box">
          <h2>Create Account</h2>
          <p>Join us today!</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="terms">
    <label>
        <input type="checkbox" required />
        <span>I agree to all statements in <a href="#">Terms of service</a></span>
    </label>
</div>

            <button type="submit" className="signin-btn">Register</button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/signin">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
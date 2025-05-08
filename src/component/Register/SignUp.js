import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";


axios.defaults.withCredentials = true; // ⚠️ Needed to allow sending cookies


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        { name, email, password },
        { withCredentials: true } // ⬅️ This allows session cookie to be set

      );

      if (res.data.success) {
        navigate("/signin"); // After signup, user goes to signin
      } else {
        setError("Registration failed. Email may already exist.");
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    }
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
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="terms">
              <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} />
              <label htmlFor="agree">
                <span>I agree to all statements in <a href="#">Terms of service</a></span>
              </label>
            </div>
            <button type="submit" className="signin-btn">Register</button>
          </form>
          <p className="signup-link">Already have an account? <a href="/signin">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

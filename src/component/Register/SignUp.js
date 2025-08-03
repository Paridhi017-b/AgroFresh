import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

axios.defaults.withCredentials = true;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateName = (value) => /^[A-Za-z\s]+$/.test(value);
  const validateEmail = (value) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value);
  const validatePassword = (value) => value.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateName(name)) {
      setError("Name must contain only letters and spaces");
      return;
    }

    if (/[A-Z]/.test(email)) {
      setError("Email should be in lowercase");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
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
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess("Successfully registered!");
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
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
          {success && <p className="success-message">{success}</p>}

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
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby="togglePassword"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  id="togglePassword"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === "Enter" && setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <div className="input-group">
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-describedby="toggleConfirmPassword"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  role="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  id="toggleConfirmPassword"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === "Enter" && setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label htmlFor="agree">
                <span>
                  I agree to all statements in <a href="#">Terms of service</a>
                </span>
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
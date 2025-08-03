import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import { Link } from "react-router-dom";


axios.defaults.withCredentials = true;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (value) =>
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/signin",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess("Successfully logged in!");
        const from = location.state?.from?.pathname || "/farmer-account";
        setTimeout(() => {
          navigate(from);
        }, 1500);
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
          {success && <p className="success-message">{success}</p>}

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
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <p className="ForgotPassword">
             <Link to="/forgot-password">Forgot Password?</Link>
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
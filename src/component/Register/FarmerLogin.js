import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !phoneNumber.trim()) {
      setError("Please provide both email and phone number.");
      setIsLoading(false);
      return;
    }

    const payload = {
      email: email.trim(),
      phone_number: phoneNumber.trim(),
    };

    console.log("Sending to backend:", payload); // DEBUG

    try {
      const res = await axios.post("http://localhost:5000/farmer-login", payload, {
        withCredentials: true,
      });

      console.log("Login response:", res.data); // DEBUG

      if (res.data.success) {
        navigate(`/farmers?email=${encodeURIComponent(res.data.farmer.email)}`);
      } else {
        setError(res.data.message || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleLogin}>
        <h2>Farmer Login</h2>
        {error && <p className="error-message">{error}</p>}

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </label>

        <button className="register-button" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

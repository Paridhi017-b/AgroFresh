import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FarmerRegistration.css";

export default function FarmerRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    farmLocation: "",
    produceType: "Vegetables",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const produceOptions = ["Vegetables", "Fruits", "Grains", "Dairy", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Trim all values before submission
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    try {
      const res = await axios.post("http://localhost:5000/register-farmer", trimmedData);
      if (res.data.success) {
        setSuccess("Farmer registered successfully!");

        // Redirect after short delay with proper template string
        setTimeout(() => {
          navigate(`/farmers?email=${encodeURIComponent(trimmedData.email)}`);
        }, 1000);
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Farmer Registration</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            required
          />
        </label>

        <label>
          Farm Location:
          <input
            type="text"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type of Produce:
          <select
            name="produceType"
            value={formData.produceType}
            onChange={handleChange}
          >
            {produceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

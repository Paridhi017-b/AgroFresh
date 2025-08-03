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

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const produceOptions = ["Vegetables", "Fruits", "Grains", "Dairy", "Other"];

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name must contain only letters.";
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Email must be lowercase and valid.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a 10-digit number.";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.farmLocation)) {
      newErrors.farmLocation = "Location must contain only letters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    try {
      const res = await axios.post("http://localhost:5000/register-farmer", trimmedData);
      if (res.data.success) {
        setSuccess("Farmer registered successfully!");
        setTimeout(() => {
navigate(`/farmers?email=${encodeURIComponent(trimmedData.email)}`);

        }, 1500);
      } else {
        setErrors({ form: "Registration failed. Try again." });
      }
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Server error" });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Farmer Registration</h2>
        {success && <p className="success-message">{success}</p>}
        {errors.form && <p className="error-message">{errors.form}</p>}

        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
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
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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
          {errors.farmLocation && <p className="error-message">{errors.farmLocation}</p>}
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
        <p className="login-text">
  Already registered?{" "}
  <span className="login-link" onClick={() => navigate("/farmer-login")}>
    Login as Farmer
  </span>
</p>

      </form>
    </div>
  );
}
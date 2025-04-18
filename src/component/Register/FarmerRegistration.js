import { useState } from "react";
import "./FarmerRegistration.css";

export default function FarmerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    farmLocation: "",
    produceType: "Vegetables",
  });

  const produceOptions = ["Vegetables", "Fruits", "Grains", "Dairy", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Farm Location:
          <input type="text" name="farmLocation" value={formData.farmLocation} onChange={handleChange} required />
        </label>

        <label>
          Type of Produce:
          <select name="produceType" value={formData.produceType} onChange={handleChange}>
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
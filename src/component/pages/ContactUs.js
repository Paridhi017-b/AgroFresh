import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "fullName") {
      // Allow only letters and spaces
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, "");
    }

    if (name === "emailAddress") {
      updatedValue = updatedValue.toLowerCase();
    }

    if (name === "phoneNumber") {
      updatedValue = updatedValue.replace(/\D/g, ""); // Remove non-numeric
      if (updatedValue.length > 10) updatedValue = updatedValue.slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    }

    if (
      !formData.emailAddress ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.emailAddress)
    ) {
      newErrors.emailAddress = "Enter a valid email address.";
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/contactus", formData, {
        withCredentials: true,
      });
      alert("✅ Message sent successfully!");
      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      alert("❌ Failed to send message.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <div>
      {/* Contact Section */}
      <main className="contact-container">
        <h1 className="contact-title">We’re Here to Help!</h1>
        <p className="contact-subtitle">
          Reach out to us via live chat, phone, or email. We're always happy to assist you!
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <img src="/images/chat.png" alt="Chat" />
            <h3>Live Chat</h3>
            <p>Talk to our agents directly for quick support.</p>
            <span className="small-text">Mon–Sun: 6am–4pm PT</span>
          </div>
          <div className="contact-card">
            <img src="/images/call.png" alt="Call" />
            <h3>Call Us</h3>
            <p>+1 (888) 701-9899</p>
            <span className="small-text">Mon–Fri: 6am–4pm PT</span>
          </div>
          <div className="contact-card">
            <img src="/images/email.png" alt="Email" />
            <h3>Email Us</h3>
            <p>Send us your queries and we’ll get back to you.</p>
            <span className="small-text">All days: 6am–4pm PT</span>
          </div>
        </div>

        {/* Form Section */}
        <section className="form-section">
          <div className="form-text">
            <h2>Send us a message</h2>
            <p>
              Fill out the form below, and our team will get in touch with you shortly.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
            {errors.emailAddress && <p className="error-text">{errors.emailAddress}</p>}

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <p className="error-text">{errors.message}</p>}

            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
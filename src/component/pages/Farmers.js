import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiStar, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Farmers.css';
import FarmersLanding from './FarmersLanding';
import { Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Farmers() {
  const query = useQuery();
  const email = query.get("email");

  const [view, setView] = useState("profile");
  const [farmer, setFarmer] = useState(null);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!email) return;

    if (email === "sample@example.com") {
      setFarmer({
        full_name: "Vikas Choudhary",
        email: "vikas345@example.com",
        phone_number: "786958683",
        farm_location: "Ujjain, Madhya Pradesh",
        produce_type: "Vegetables",
        farm_name: "Organic Valley Farm",
        rating: 4.5,
        join_date: "2025"
      });

      setFeedbacks([
        { name: "KRITI", message: "Great produce!" },
        { name: "KRISHNA", message: "Loved the organic vegetables." }
      ]);
    } else {
      // Real data from backend
      axios.get(`http://localhost:5000/get-farmer?email=${email}`)
        .then(res => {
          if (res.data.success) {
            setFarmer(res.data.farmer);
          } else {
            setError("Farmer not found");
          }
        })
        .catch(() => setError("Server error"));

      axios.get(`http://localhost:5000/get-feedback?email=${email}`)
        .then(res => {
          if (res.data.success) {
            setFeedbacks(res.data.feedback);
          }
        });
    }
  }, [email]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/submit-feedback", {
        ...feedback,
        farmerEmail: email,
      });
      if (res.data.success) {
        const updated = await axios.get(`http://localhost:5000/get-feedback?email=${email}`);
        setFeedbacks(updated.data.feedback);
        setFeedback({ name: "", email: "", message: "" });
        alert("Feedback submitted!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback.");
    }
  };

  if (!email) return <FarmersLanding />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!farmer) return <p>Loading...</p>;

  return (
    <div className="farmer-profile-container">
      <div className="toggle-buttons">
        <button onClick={() => setView("profile")} className={view === "profile" ? "active" : ""}>Profile</button>
        <button onClick={() => setView("feedback")} className={view === "feedback" ? "active" : ""}>Feedback</button>
      </div>

      {view === "profile" && (
        <motion.div className="profile-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="profile-header">
            <div className="profile-info">
              <h1>{farmer.full_name}</h1>
              <p className="farm-name">{farmer.farm_name || 'My Organic Farm'}</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(farmer.rating || 4.5) ? 'filled' : ''}>★</span>
                ))}
                <span>({farmer.rating || 4.5})</span>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item"><FiUser className="detail-icon" /><div><h3>Specialization</h3><p>{farmer.produce_type}</p></div></div>
            
            <div className="detail-item"><FiCalendar className="detail-icon" /><div><h3>Member Since</h3><p>{farmer.created_at || '2025'}</p></div></div>
          </div>

          <div className="location-contact">
            <h3>Farm Location</h3><p>{farmer.farm_location}</p>
            <h3>Contact</h3><p>{farmer.phone_number}</p>
          </div>

          <div className="farmer-actions">
            <Link 
              to="/farmer/products" 
              state={{ farmerId: farmer.id }}
              className="manage-products-btn"
            >
              Manage My Products
            </Link>
          </div>
        </motion.div>
      )}

      {view === "feedback" && (
        <motion.div className="feedback-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2>Customer Feedback</h2>

          <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Feedback"
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
            />
            <button type="submit">Submit Feedback</button>
          </form>

          <div className="feedback-list">
            {feedbacks.map((fb, i) => (
              <motion.div key={i} className="feedback-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div className="feedback-header">
                  <strong>{fb.name}</strong>
                </div>
                <p className="feedback-text">"{fb.message}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
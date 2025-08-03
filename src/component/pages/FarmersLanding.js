import React from 'react';
import { Link } from 'react-router-dom';
import './FarmersLanding.css';

export default function FarmersLanding() {
  return (
    <div className="farmers-landing">
      <h2>Our Farming Community</h2>
      <p>Connect with local farmers and discover fresh produce</p>
      <div className="landing-actions">
        <Link to="/farmer-registration" className="register-btn">
          Register Your Farm
        </Link>
        <Link to="/farmers?email=sample@example.com" className="view-sample-btn">
          View Sample Profile
        </Link>
      </div>
    </div>
  );
}
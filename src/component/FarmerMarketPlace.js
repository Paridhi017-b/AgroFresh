import React from "react";
import { useNavigate } from "react-router-dom";
import './FarmerMarketPlace.css';

const FarmerMarketplace = () => {
  const navigate = useNavigate();

  return (
    <div className="farmer-marketplace-container">
      <div className="marketplace-overlay"></div>
      
      <div className="marketplace-content">
        <h1 className="marketplace-title">
          Partner with <span className="brand-name">AgriMarket</span> 
          <br />Grow Your Farm Business
        </h1>
        <p className="marketplace-subtitle">
          Connect directly with buyers and expand your market reach with our trusted platform
        </p>
        <div className="offer-text">
          <span className="plant-emoji" role="img" aria-label="plant">🌱</span>
          0% commission for the first month! Valid for new farmer partners.
        </div>
        <button 
          className="register-btn" 
          onClick={() => navigate("/farmer-registration")}
        >
          Register as a Farmer
        </button>
        </div>
      
    </div>
  );
};

export default FarmerMarketplace;
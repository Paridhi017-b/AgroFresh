/*import React from "react";
import "./FarmerMarketplace.css";

const FarmerMarketplace = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Partner with AgriMarket and Grow Your Farm Business</h1>
        <p>
          <span role="img" aria-label="plant">🌱</span> 
          0% commission for the first month! Valid for new farmer partners in select regions.
        </p>
        <button className="register-btn">Register as a Farmer</button>
      </div>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default FarmerMarketplace;
*/
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerMarketPlace.css";

const FarmerMarketplace = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h1>Partner with AgriMarket and Grow Your Farm Business</h1>
        <p>
          <span role="img" aria-label="plant">🌱</span> 
          0% commission for the first month! Valid for new farmer partners in select regions.
        </p>
        <button className="register-btn" onClick={() => navigate("/farmer-registration")}>Register as a Farmer</button>
      </div>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default FarmerMarketplace;
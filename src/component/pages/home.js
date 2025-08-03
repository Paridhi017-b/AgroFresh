import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./home.css"; // Ensure you have the CSS file


const Home = () => {
  return (
    <div>
      <div className="farmer-dashboard">

      {/* Hero Section */}
      <header className="hero">
  

        <div className="hero-overlay">
          <div className="hero-content">
            <div className="tagline">Connecting Farmers to Customers</div>
            <h1>Fresh Produce, Directly from Farmers.</h1>
            <p>AgroFresh ensures farm-fresh quality by linking farmers directly to consumers with fair pricing.</p>
            
<div className="buttons">
  <Link to="/explore">
    <button className="explore-btn" onClick={() => window.scrollTo(0, 0)}>
      Explore
    </button>
  </Link>
  <Link to="/signin">
    <button className="get-started-btn">Get Started</button>
  </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose AgroFresh Section */}
      <section className="why-choose">
        <h2>Why Choose AgroFresh?</h2>
        <p>We bring fresh, organic produce straight from local farmers to your table.</p>

        <div className="features">
          <div className="feature-card">
            <h3>Fresh & Organic</h3>
            <p>Sustainable, chemical-free produce delivered with transparency and trust.</p>
          </div>

          <div className="feature-card">
            <h3>Fair Prices</h3>
            <p>Sustainable, chemical-free produce delivered with transparency and trust.</p>
          </div>

          <div className="feature-card">
            <h3>Support Local Farmers</h3>
            <p>Sustainable, chemical-free produce delivered with transparency and trust.</p>
          </div>
        </div>
      </section>
    </div>
    /</div>
  );
};

export default Home;
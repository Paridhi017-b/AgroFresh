import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="/logo.jpg" alt="Logo" />
          <span>AgroFresh</span>
        </div>

        <button 
          className="burger" 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-content ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="nav-main">
            <ul className="nav-links">
              <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
              <li><Link to="/products" onClick={closeMobileMenu}>Products</Link></li>
              <li><Link to="/Farmers" onClick={closeMobileMenu}>Farmers</Link></li>
              <li 
                className="dropdown"
                onMouseEnter={() => !isMobileMenuOpen && setShowDropdown(true)}
                onMouseLeave={() => !isMobileMenuOpen && setShowDropdown(false)}
                onClick={() => isMobileMenuOpen && setShowDropdown(!showDropdown)}
              >
                <Link to=" " className="dropdown-toggle">About Us</Link>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li><Link to="/our-culture" onClick={closeMobileMenu}>Our Culture</Link></li>
                    <li><Link to="/our-team" onClick={closeMobileMenu}>Our Team</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
            </ul>
          </div>

          <div className="join-buttons">
            <Link to="/farmer-marketplace" className="join-btn" onClick={closeMobileMenu}>
              Join as a Farmer
            </Link> 
            <Link to="/signup" className="join-btn" onClick={closeMobileMenu}>
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
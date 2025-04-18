import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" />
        <span>AgroFresh</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/Farmers">Farmers</Link></li>

        {/* Dropdown Start */}
        <li 
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
           <Link to="#" className="dropdown-toggle">About Us</Link>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/our-culture">Our Culture</Link></li>
              <li><Link to="/our-team">Our Team</Link></li>
            </ul>
          )}
        </li>
        {/* Dropdown End */}

        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="join-buttons">
        <Link to="/farmer-marketplace" className="join-btn">
          Join as a Farmer
        </Link> 
        <Link to="/signup" className="join-btn">
          Join Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

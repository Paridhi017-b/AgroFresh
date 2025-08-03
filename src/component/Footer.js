import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="agrofresh-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-col footer-about">
            <h3 className="footer-logo">AgroFresh</h3>
            <p className="footer-mission">
              Connecting farmers directly to customers for the freshest produce experience.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <span>contact@agrofresh.com</span>
              </div>
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <span>+91 (80000000XX) FRESH-NOW</span>
              </div>
              <div className="contact-item">
                <MdLocationOn className="contact-icon" />
                <span>Shri Vaishnav Vidyapeeth Vishwavidyalaya Campus : Indore – Ujjain Road, Indore – 453111</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com/agrofresh" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://twitter.com/agrofresh" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://instagram.com/agrofresh" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com/company/agrofresh" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} AgroFresh. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <a href="/terms">Terms of Service</a>
            <span>|</span>
            <a href="/privacy">Privacy Policy</a>
            <span>|</span>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
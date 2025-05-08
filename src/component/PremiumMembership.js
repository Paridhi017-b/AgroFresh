import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './PremiumMembership.css';

const PremiumMembership = () => {
  const location = useLocation();
  const routeEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    name: '',
    email: routeEmail,
    phone: '',
    farmSize: '',
    paymentMethod: 'credit-card'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // If email is passed via route, update formData when component mounts
  useEffect(() => {
    if (routeEmail) {
      setFormData((prev) => ({ ...prev, email: routeEmail }));
    }
  }, [routeEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/premium-join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        console.log("Submitted:", data.message);
        setIsSubmitted(true);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Submission failed. Please try again later.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="premium-page">
        <div className="premium-confirmation">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <h2>Welcome to AgroFresh Premium!</h2>
          <div className="confirmation-card">
            <p>Thank you for joining AgroFresh Premium. Your membership benefits are now active.</p>
            <ul className="premium-benefits">
              <li><span>✓</span> 20% discount on all equipment purchases</li>
              <li><span>✓</span> Free delivery for orders over $100</li>
              <li><span>✓</span> Priority customer support</li>
              <li><span>✓</span> Exclusive market insights</li>
            </ul>
            <Link to="/" className="home-link">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-page">
      <Navbar />
      <div className="premium-membership">
        <div className="premium-header">
          <h1>AgroFresh <span>Premium</span> Benefits</h1>
          <p>Upgrade your farming experience with our exclusive membership</p>
        </div>

        <div className="premium-content">
          <div className="benefits-card">
            <h2>Your Premium Benefits</h2>
            <ul className="benefits-list">
              <li><span>✓</span> 20% discount on all equipment purchases</li>
              <li><span>✓</span> Free delivery for orders over $100</li>
              <li><span>✓</span> Priority customer support</li>
              <li><span>✓</span> Exclusive market insights</li>
            </ul>
            <div className="price-section">
              <p className="price">$99<span>/year</span></p>
              <p className="price-note">Billed annually. Cancel anytime.</p>
            </div>
            <div className="featured-badge">Most Popular</div>
          </div>

          <div className="signup-form">
            <h2>Join AgroFresh Premium</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!routeEmail} // Disable if email was passed in
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="farmSize">Farm Size (acres)</label>
                <input
                  type="number"
                  id="farmSize"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  {['credit-card', 'paypal', 'bank-transfer'].map(method => (
                    <label key={method} className={formData.paymentMethod === method ? 'active' : ''}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                      />
                      <div className="payment-option-content">
                        {method.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="join-button">
                <span>Join Now</span>
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMembership;

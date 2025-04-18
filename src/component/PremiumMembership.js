import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar
import './PremiumMembership.css';

const PremiumMembership = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmSize: '',
    paymentMethod: 'credit-card'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
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
                  <label className={formData.paymentMethod === 'credit-card' ? 'active' : ''}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span>Credit Card</span>
                    </div>
                  </label>
                  <label className={formData.paymentMethod === 'paypal' ? 'active' : ''}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span>PayPal</span>
                    </div>
                  </label>
                  <label className={formData.paymentMethod === 'bank-transfer' ? 'active' : ''}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <span>Bank Transfer</span>
                    </div>
                  </label>
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
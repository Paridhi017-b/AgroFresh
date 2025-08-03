import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (routeEmail) {
      setFormData(prev => ({ ...prev, email: routeEmail }));
    }
  }, [routeEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain letters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone should be 10 digits";
    }
    
    if (!formData.farmSize) {
      newErrors.farmSize = "Farm size is required";
    } else if (isNaN(formData.farmSize) || formData.farmSize <= 0) {
      newErrors.farmSize = "Enter valid farm size";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/premium-join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert("Error: " + (data.message || "Failed to submit"));
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Submission failed. Please try again later.");
    } finally {
      setIsLoading(false);
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
                  className={errors.name ? 'error' : ''}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                  disabled={!!routeEmail}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="farmSize">Farm Size (acres)</label>
                <input
                  type="number"
                  id="farmSize"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  className={errors.farmSize ? 'error' : ''}
                  min="1"
                  required
                />
                {errors.farmSize && <span className="error-message">{errors.farmSize}</span>}
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  {['credit-card', 'paypal', 'Bank Transfer'].map(method => (
                    <label 
                      key={method}
                      className={`payment-method ${formData.paymentMethod === method ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                      />
                      {method.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="join-button" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span>Processing...</span>
                    <div className="spinner"></div>
                  </>
                ) : (
                  <>
                    <span>Join Now</span>
                    <div className="arrow-wrapper">
                      <div className="arrow"></div>
                    </div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMembership;
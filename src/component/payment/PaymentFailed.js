import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import './Payment.css';
import axios from 'axios';

const PaymentFailed = () => {
  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get("order_id");

    if (orderId) {
      axios.put("http://localhost:5000/update-order-status", {
        order_id: orderId,
        status: "failed"
      }).catch((err) => console.error("❌ Failed to update failed status:", err));
    }
  }, []);

  return (
    <div className="payment-result-container">
      <div className="payment-result-card failed">
        <FaTimesCircle className="failed-icon" />
        <h2>Payment Failed</h2>
        <p>We couldn't process your payment. Please try again.</p>
        <div className="result-actions">
          <Link to="/payment" className="try-again-link">Try Again</Link>
          <Link to="/" className="home-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;

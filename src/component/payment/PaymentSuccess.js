import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import './Payment.css';

const PaymentSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("order_id");

  useEffect(() => {
    if (orderId) {
      // Verify payment and get order details
      axios.get(`http://localhost:5000/verify-payment/${orderId}`)
        .then((res) => {
          if (res.data.status === "PAID") {
            // Get order details
            axios.get(`http://localhost:5000/order-details/${orderId}`, {
              withCredentials: true
            })
            .then(response => {
              setOrderDetails(response.data);
            })
            .catch(err => console.error("Error fetching order details:", err));
          }
        })
        .catch((err) => console.error("Failed to verify payment:", err));
    }
  }, [orderId]);

  const downloadBill = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/download-bill/${orderId}`, {
        responseType: 'blob',
        withCredentials: true
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AgroFresh-Receipt-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download bill:', err);
    }
  };

  return (
    <div className="payment-result-container">
      <div className="payment-result-card success">
        <FaCheckCircle className="success-icon" />
        <h2>Payment Successful!</h2>
        {orderDetails && (
          <>
            <p>Order ID: {orderDetails.order_id}</p>
            <p>Total Amount: ₹{orderDetails.total_amount}</p>
            <p>Status: {orderDetails.status}</p>
          </>
        )}
        <div className="result-actions">
          <button onClick={downloadBill} className="download-bill-btn">
            Download Receipt
          </button>
          <Link to="/" className="home-link">Back to Home</Link>
          <Link to="/products" className="shop-link">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
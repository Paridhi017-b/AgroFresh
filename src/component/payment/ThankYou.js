// src/components/ThankYou.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

const ThankYou = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalAmount, userDetails } = state || {};

  const downloadReceipt = () => {
    const html = `
      <h1>AgroFresh Receipt</h1>
      <p><strong>Name:</strong> ${userDetails?.name}</p>
      <p><strong>Email:</strong> ${userDetails?.email}</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${cartItems.map(item => `<li>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</li>`).join('')}
      </ul>
      <strong>Total: ₹${totalAmount}</strong>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgroFresh-Receipt.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="thank-you-page">
      <h1>🎉 Thank You for Your Payment!</h1>
      <p>Your transaction was successful.</p>
      <button onClick={downloadReceipt}><FaDownload /> Download Receipt</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default ThankYou;

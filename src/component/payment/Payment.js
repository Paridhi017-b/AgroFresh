import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import { FaLock, FaCreditCard, FaMoneyBillWave, FaDownload, FaArrowLeft } from 'react-icons/fa';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [orderDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  // Ensure all prices are numbers
  const sanitizedCartItems = cartItems.map(item => ({
    ...item,
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    quantity: typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity
  }));

  const sanitizedTotalAmount = typeof totalAmount === 'string' ? parseFloat(totalAmount) : totalAmount;

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          withCredentials: true
        });
        if (response.data.success) {
          setUserDetails(response.data.user);
        } else {
          navigate('/signin');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        navigate('/signin');
      }
    };

    fetchUserDetails();
  }, [navigate]);

const saveOrderToDatabase = async () => {
  try {
    const orderData = {
      customer_email: userDetails?.email,
      items: sanitizedCartItems,
      totalAmount: paymentMethod === 'cod' ? 
        sanitizedTotalAmount + 50 : sanitizedTotalAmount,
      paymentMethod: paymentMethod,
      status: paymentMethod === 'cod' ? 'pending' : 'paid'
    };

    await axios.post('http://localhost:5000/api/orders', orderData, { 
      withCredentials: true 
    });
  } catch (err) {
    console.error("Failed to save order:", err);
  }
};

 
  const handlePayment = (async) => {
    setLoading(true);
    
    // Simulate payment processing
  setTimeout(async () => {
    try {
      // First save the order to database
      await saveOrderToDatabase();
      
      // Then set payment success
      setPaymentSuccess(true);
    } catch (err) {
      console.error("Payment processing error:", err);
      // Handle error - maybe show a message to the user
    } finally {
      setLoading(false);
    }
  }, 2000);
};

  const downloadReceipt = () => {
    try {
      const receiptContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AgroFresh - Order Receipt</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 30px;
              background-color: #f9f9f9;
            }
            .receipt-container {
              background: white;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .header h1 {
              color: #2e7d32;
              margin: 0;
              font-size: 28px;
            }
            .header p {
              color: #666;
              margin: 5px 0 0;
            }
            .order-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .info-box {
              flex: 1;
              margin: 0 15px;
            }
            .info-box h2 {
              font-size: 18px;
              color: #444;
              border-bottom: 1px solid #ddd;
              padding-bottom: 8px;
              margin-top: 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 25px 0;
            }
            th {
              background-color: #f5f5f5;
              padding: 12px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #eee;
            }
            .total-row {
              font-weight: bold;
              background-color: #f9f9f9;
            }
            .payment-method {
              margin-top: 30px;
              padding: 15px;
              background-color: #f5f5f5;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #777;
              font-size: 14px;
            }
            .barcode {
              font-family: 'Libre Barcode 128', cursive;
              font-size: 36px;
              text-align: center;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <h1>AgroFresh</h1>
              <p>Order Receipt</p>
            </div>
            
            <div class="order-info">
              <div class="info-box">
                <h2>Customer Details</h2>
                <p><strong>Name:</strong> ${userDetails?.name || 'Customer'}</p>
                <p><strong>Email:</strong> ${userDetails?.email || 'N/A'}</p>
              </div>
              
              <div class="info-box">
                <h2>Order Details</h2>
                <p><strong>Order Date:</strong> ${orderDate.toLocaleString()}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</p>
                <p><strong>Order Status:</strong> ${paymentMethod === 'cod' ? 'Pending' : 'Paid'}</p>
              </div>
            </div>
            
            <h2>Order Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${sanitizedCartItems.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>₹${Number(item.price).toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td colspan="3">Subtotal</td>
                  <td>₹${Number(sanitizedTotalAmount).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3">Delivery Charges</td>
                  <td>₹${(paymentMethod === 'cod' ? 50 : 0).toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3">Total Amount</td>
                  <td>₹${(paymentMethod === 'cod' ? Number(sanitizedTotalAmount) + 50 : Number(sanitizedTotalAmount)).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            
            <div class="payment-method">
              <p><strong>Payment Method:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : 
                paymentMethod === 'upi' ? 'UPI Payment' : 'Credit/Debit Card'}</p>
              ${paymentMethod === 'cod' ? `
                <p>Please keep exact change ready for the delivery person</p>
              ` : ''}
            </div>
            
            <div class="barcode">*AGRO${orderDate.getTime()}*</div>
            
            <div class="footer">
              <p>Thank you for shopping with AgroFresh!</p>
              <p>For any queries, please contact support@agrofresh.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob([receiptContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AgroFresh-Receipt-${orderDate.getTime()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating receipt:', err);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success-page">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Thank You For Your Order!</h1>
          <p>Your {paymentMethod === 'cod' ? 'order has been placed' : 'payment was successful'}.</p>
          <button className="download-receipt-btn" onClick={downloadReceipt}>
            <FaDownload /> Download Receipt
          </button>
          <button className="back-to-home" onClick={() => navigate('/explore')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Secure Checkout</h1>
          <div className="secure-badge">
            <FaLock className="lock-icon" />
            <span>100% Secure Payment</span>
          </div>
        </div>
        
        <div className="payment-grid">
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {sanitizedCartItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">× {item.quantity}</div>
                    <div className="item-price">₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total Amount:</span>
                <span className="total-amount">₹{Number(sanitizedTotalAmount).toFixed(2)}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="delivery-charge">
                  <span>+ Delivery Charge:</span>
                  <span>₹50.00</span>
                </div>
              )}
              {paymentMethod === 'cod' && (
                <div className="final-total">
                  <span>Total Payable:</span>
                  <span>₹{(Number(sanitizedTotalAmount) + 50).toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="payment-actions">
              <button className="back-button" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back to Cart
              </button>
            </div>
          </div>
          
          <div className="payment-method-section">
            <div className="payment-method-card">
              <h2>Payment Method</h2>
              
              <div className="payment-method-tabs">
                <button 
                  className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard /> Card
                </button>
                
                <button 
                  className={`method-tab ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <FaMoneyBillWave /> COD
                </button>
              </div>
              
              <div className="payment-gateway-container">
                {loading && (
                  <div className="payment-loading">
                    <div className="spinner"></div>
                    <p>Processing your payment...</p>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="dummy-card-payment">
                    <div className="dummy-card-form">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" value="4111 1111 1111 1111" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" value="12/25" readOnly />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" value="123" readOnly />
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                       <input type="text" value={userDetails?.name || "Customer"} readOnly />

                      </div>
                    </div>
                  </div>
                )}
                
                
                
                {paymentMethod === 'cod' && (
                  <div className="dummy-cod-payment">
                    <p>Pay cash when your order is delivered</p>
                    <p className="cod-note">Please keep exact change ready for the delivery person</p>
                  </div>
                )}
                
                <button 
                  className="pay-now-btn" 
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 
                    paymentMethod === 'cod' ? `Place Order (₹${(Number(sanitizedTotalAmount) + 50).toFixed(2)})` : 
                    `Pay Now (₹${Number(sanitizedTotalAmount).toFixed(2)})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
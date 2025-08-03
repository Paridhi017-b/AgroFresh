import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaSeedling, FaLeaf,
  FaStar, FaTicketAlt, FaInfoCircle, FaCommentAlt,
  FaExclamationTriangle, FaSignOutAlt,
  FaTractor, FaWarehouse, FaChartLine,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import "./FarmerAccountPage.css";

axios.defaults.withCredentials = true;

const FarmerAccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [organicMode, setOrganicMode] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [farmOptions, setFarmOptions] = useState({
    equipmentStatus: false,
    storageInventory: true,
    marketTrends: false
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          navigate("/signin", { state: { from: "/farmer-account" } });
        }
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err);
        navigate("/signin", { state: { from: "/farmer-account" } });
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleOrganicMode = () => {
    setOrganicMode(!organicMode);
  };

  const toggleActivity = () => {
    setShowActivity(!showActivity);
  };

  const togglePremiumModal = () => {
    setShowPremiumModal(!showPremiumModal);
  };

  const handleFarmOptionChange = (option) => {
    setFarmOptions({
      ...farmOptions,
      [option]: !farmOptions[option]
    });
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
      navigate("/signin");
    } catch (err) {
      console.error("❌ Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  const handleCouponClick = (coupon) => {
    alert(`Coupon Code: ${coupon.code}\nValid until: ${coupon.validUntil}`);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const renderActivityItem = (activity) => (
    <div key={activity.id} className="activity-item">
      <div className="activity-action">{activity.action}</div>
      <div className="activity-details">
        <span className="activity-date">{activity.date}</span>
        {activity.amount && <span className="activity-amount">{activity.amount}</span>}
      </div>
    </div>
  );

  const renderCouponItem = (coupon) => (
    <div key={coupon.id} className="coupon-item" onClick={() => handleCouponClick(coupon)}>
      <FaTicketAlt className="coupon-icon" />
      <div className="coupon-info">
        <div className="coupon-title">{coupon.title}</div>
        <div className="coupon-code">Code: {coupon.code}</div>
      </div>
      <div className="coupon-valid">Valid until: {coupon.validUntil}</div>
    </div>
  );

  if (!user) {
    return (
      <div className="loading-container">
        <p>Loading your account...</p>
      </div>
    );
  }

  const farmerData = {
    name: user?.name || 'User',
    email: user?.email || '',
    profileCompletion: 65,
    rating: 4.2,
    farmName: user?.email ? `${user.email.split('@')[0]}'s Farm` : 'My Farm',
    products: [],
    memberSince: new Date().toLocaleDateString(),
    activity: [
      { id: 1, action: "Account created", date: new Date().toLocaleDateString(), amount: "" }
    ],
    coupons: [
      { id: 1, title: "Welcome Coupon", code: "WELCOME10", validUntil: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString() }
    ]
  };

  return (
    <div className="farmer-account-container">
      {/* Header */}
      <div className="account-header">
        <div className="user-profile">
          <div className="avatar">{farmerData.name.charAt(0)}</div>
          <div className="user-info">
            <h1 className="user-name">{farmerData.name}</h1>
            <p className="user-email">{farmerData.email}</p>
            <button className="activity-toggle" onClick={toggleActivity}>
              View activity {showActivity ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
        {showActivity && (
          <div className="activity-dropdown">
            <h4>Recent Activity</h4>
            {farmerData.activity.map(renderActivityItem)}
          </div>
        )}
      </div>

      {/* Premium Modal */}
      <div className="premium-membership-card" onClick={togglePremiumModal}>
        <div className="premium-content">
          <FaSeedling className="premium-icon" />
          <div className="premium-text">
            <h2>Join AgroFresh Premium</h2>
            <p>Get exclusive benefits for your farm</p>
          </div>
        </div>
      </div>

      {showPremiumModal && (
        <div className="premium-modal">
          <div className="modal-content">
            <h2>AgroFresh Premium Benefits</h2>
            <ul>
              <li>20% discount on all equipment purchases</li>
              <li>Free delivery for orders over $100</li>
              <li>Priority customer support</li>
              <li>Exclusive market insights</li>
            </ul>
            <div className="modal-actions">
              <button 
                className="join-button"
                onClick={() => navigate('/premium')}
              >
                Join Now
              </button>
              <button 
                className="close-button"
                onClick={togglePremiumModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="profile-section">
              <h3 className="section-title">
                <FaUser className="section-icon" /> Your Farm Profile
              </h3>
              <div className="completion-status">
                <div className="completion-bar">
                  <div
                    className="completion-progress"
                    style={{ width: `${farmerData.profileCompletion}%` }}
                  ></div>
                </div>
                <span className="completion-percent">{farmerData.profileCompletion}% completed</span>
              </div>
            </div>

            <div className="preferences-section">
              <h3 className="section-title">Preferences</h3>

              <div className="preference-item" onClick={toggleOrganicMode}>
                <div className="preference-label">
                  <FaLeaf className={`preference-icon ${organicMode ? 'active' : ''}`} />
                  <span>Organic Farming Mode</span>
                </div>
                <div className={`toggle-switch ${organicMode ? 'on' : 'off'}`}>
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>

            <div className="rating-section">
              <h3 className="section-title">
                <FaStar className="section-icon" /> Your Farm Rating
              </h3>
              <div className="rating-display">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= Math.floor(farmerData.rating) ? 'filled' : ''} ${star === Math.ceil(farmerData.rating) && farmerData.rating % 1 > 0 ? 'half-filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="rating-value">{farmerData.rating.toFixed(1)}</span>
              </div>
              <button className="view-reviews" onClick={() => navigate('/reviews')}>View all reviews</button>
            </div>
          </div>
        )}

        {activeTab === 'management' && (
          <div className="management-tab">
            <h3 className="section-title">
              <FaTractor className="section-icon" /> Farm Management
            </h3>
            <div className="management-options">
              {Object.entries(farmOptions).map(([option, value]) => (
                <div key={option} className="management-item">
                  <label className="management-option">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleFarmOptionChange(option)}
                    />
                    <div className="option-content">
                      {option === 'equipmentStatus' && <FaTractor className="option-icon" />}
                      {option === 'storageInventory' && <FaWarehouse className="option-icon" />}
                      {option === 'marketTrends' && <FaChartLine className="option-icon" />}
                      <span>{option.split(/(?=[A-Z])/).join(' ')}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="management-actions">
              <button className="action-button">Save Settings</button>
              <button className="action-button">View Reports</button>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="benefits-tab">
            <div className="coupons-section">
              <h4 className="subsection-title">Your Coupons</h4>
              {farmerData.coupons.map(renderCouponItem)}
            </div>
            <div className="premium-benefits">
              <h4 className="subsection-title">Premium Benefits</h4>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaSeedling />
                  </div>
                  <h5>Organic Certification</h5>
                  <p>Get certified and increase your market value</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaChartLine />
                  </div>
                  <h5>Market Insights</h5>
                  <p>Access to premium market trends and analytics</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaTractor />
                  </div>
                  <h5>Equipment Discount</h5>
                  <p>20% off on all farming equipment purchases</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaWarehouse />
                  </div>
                  <h5>Storage Solutions</h5>
                  <p>Discounted rates on storage facilities</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <button className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleNavigation('profile')}>
          <FaUser className="nav-icon" />
          <span>Profile</span>
        </button>
      </div>

      {/* More Options Menu */}
      <div className="more-options">
        <h3 className="options-title">More Options</h3>

        <div className="option-item" onClick={() => navigateTo('/our-team')}>
          <FaInfoCircle className="option-icon" />
          <span>About US</span>
        </div>

        <div className="option-item" onClick={() => navigateTo('/contact')}>
          <FaCommentAlt className="option-icon" />
          <span>Send Feedback</span>
        </div>

        <div className="option-item" onClick={() => navigateTo('/contact')}>
          <FaExclamationTriangle className="option-icon" />
          <span>Report an Issue</span>
        </div>

        <div className="option-item logout" onClick={handleLogout}>
          <FaSignOutAlt className="option-icon" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default FarmerAccountPage;

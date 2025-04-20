import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  FaUser, FaShoppingBag, FaSeedling, FaLeaf, FaMoon, 
  FaStar, FaTicketAlt, FaInfoCircle, FaCommentAlt, 
  FaExclamationTriangle, FaCog, FaSignOutAlt,
  FaTractor, FaWarehouse, FaChartLine,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './FarmerAccountPage.css';

const FarmerAccountPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [organicMode, setOrganicMode] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [farmOptions, setFarmOptions] = useState({
    equipmentStatus: false,
    storageInventory: true,
    marketTrends: false
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [farmerData, setFarmerData] = useState({
    name: "",
    email: "",
    profileCompletion: 0,
    rating: 0,
    farmName: "",
    products: [],
    memberSince: "",
    activity: [],
    coupons: []
  });

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('farmerData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFarmerData({
        ...parsedData,
        // Set default values if they don't exist in localStorage
        profileCompletion: parsedData.profileCompletion || 20,
        rating: parsedData.rating || 0,
        farmName: parsedData.farmName || `${parsedData.email.split('@')[0]}'s Farm`,
        products: parsedData.products || [],
        memberSince: parsedData.memberSince || new Date().toLocaleDateString(),
        activity: parsedData.activity || [
          { id: 1, action: "Account created", date: new Date().toLocaleDateString(), amount: "" }
        ],
        coupons: parsedData.coupons || [
          { id: 1, title: "Welcome Coupon", code: "WELCOME10", validUntil: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString() }
        ]
      });
    } else {
      // If no data in localStorage, redirect to signin
      navigate('/signin');
    }
  }, [navigate]);

  // Toggle functions
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    // Save preference
    updateFarmerData({ darkMode: newMode });
  };

  const toggleOrganicMode = () => {
    const newMode = !organicMode;
    setOrganicMode(newMode);
    updateFarmerData({ organicMode: newMode });
  };

  const toggleActivity = () => {
    setShowActivity(!showActivity);
  };

  const togglePremiumModal = () => {
    setShowPremiumModal(!showPremiumModal);
  };

  // Update farmer data in state and localStorage
  const updateFarmerData = (updates) => {
    const newData = { ...farmerData, ...updates };
    setFarmerData(newData);
    localStorage.setItem('farmerData', JSON.stringify(newData));
  };

  // Handler functions
  const handleFarmOptionChange = (option) => {
    const newOptions = {
      ...farmOptions,
      [option]: !farmOptions[option]
    };
    setFarmOptions(newOptions);
    updateFarmerData({ farmOptions: newOptions });
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('farmerData');
    navigate('/signin');
  };

  const handleCouponClick = (coupon) => {
    alert(`Coupon Code: ${coupon.code}\nValid until: ${coupon.validUntil}`);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  // Render functions
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
    <div 
      key={coupon.id} 
      className="coupon-item"
      onClick={() => handleCouponClick(coupon)}
    >
      <FaTicketAlt className="coupon-icon" />
      <div className="coupon-info">
        <div className="coupon-title">{coupon.title}</div>
        <div className="coupon-code">Code: {coupon.code}</div>
      </div>
      <div className="coupon-valid">Valid until: {coupon.validUntil}</div>
    </div>
  );

  if (!farmerData.email) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className={`farmer-account-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Account Header */}
      <div className="account-header">
        <div className="user-profile">
          <div className="avatar">{farmerData.name.charAt(0)}</div>
          <div className="user-info">
            <h1 className="user-name">{farmerData.name}</h1>
            <p className="user-email">{farmerData.email}</p>
            <button 
              className="activity-toggle"
              onClick={toggleActivity}
            >
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

      {/* Premium Membership Section */}
      <div 
        className="premium-membership-card"
        onClick={togglePremiumModal}
      >
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

      {/* Main Content Tabs */}
      <div className="account-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="profile-section">
              <h3 className="section-title">
                <FaUser className="section-icon" />
                Your Farm Profile
              </h3>
              <div className="completion-status">
                <div className="completion-bar">
                  <div 
                    className="completion-progress" 
                    style={{ width: `${farmerData.profileCompletion}%` }}
                  ></div>
                </div>
                <span className="completion-percent">
                  {farmerData.profileCompletion}% completed
                </span>
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
              
              <div className="preference-item" onClick={toggleDarkMode}>
                <div className="preference-label">
                  <FaMoon className={`preference-icon ${darkMode ? 'active' : ''}`} />
                  <span>Appearance</span>
                </div>
                <span className="mode-value">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
            </div>

            <div className="rating-section">
              <h3 className="section-title">
                <FaStar className="section-icon" />
                Your Farm Rating
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
              <button 
                className="view-reviews"
                onClick={() => navigate('/reviews')}
              >
                View all reviews
              </button>
            </div>
          </div>
        )}

        {/* Management Tab */}
        {activeTab === 'management' && (
          <div className="management-tab">
            <h3 className="section-title">
              <FaTractor className="section-icon" />
              Farm Management
            </h3>
            
            <div className="management-options">
              <div className="management-item">
                <label className="management-option">
                  <input 
                    type="checkbox"
                    checked={farmOptions.equipmentStatus}
                    onChange={() => handleFarmOptionChange('equipmentStatus')}
                  />
                  <div className="option-content">
                    <FaTractor className="option-icon" />
                    <span>Equipment Status Monitoring</span>
                  </div>
                </label>
              </div>
              
              <div className="management-item">
                <label className="management-option">
                  <input 
                    type="checkbox"
                    checked={farmOptions.storageInventory}
                    onChange={() => handleFarmOptionChange('storageInventory')}
                  />
                  <div className="option-content">
                    <FaWarehouse className="option-icon" />
                    <span>Storage Inventory Tracking</span>
                  </div>
                </label>
              </div>
              
              <div className="management-item">
                <label className="management-option">
                  <input 
                    type="checkbox"
                    checked={farmOptions.marketTrends}
                    onChange={() => handleFarmOptionChange('marketTrends')}
                  />
                  <div className="option-content">
                    <FaChartLine className="option-icon" />
                    <span>Market Trends Analysis</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="management-actions">
              <button 
                className="action-button"
                onClick={() => navigate('/equipment')}
              >
                View Equipment
              </button>
              <button 
                className="action-button"
                onClick={() => navigate('/inventory')}
              >
                Check Inventory
              </button>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="benefits-tab">
            <h3 className="section-title">
              <FaTicketAlt className="section-icon" />
              Farm Benefits
            </h3>
            
            <div className="coupons-section">
              <h4 className="subsection-title">Available Coupons</h4>
              {farmerData.coupons.map(renderCouponItem)}
            </div>

            <div className="benefits-section">
              <h4 className="subsection-title">Your Benefits</h4>
              <div className="benefits-grid">
                <div 
                  className="benefit-card"
                  onClick={() => navigate('/equipment-discounts')}
                >
                  <div className="benefit-icon">
                    <FaTractor />
                  </div>
                  <h5>Equipment Discounts</h5>
                  <p>Save up to 30% on farm equipment</p>
                </div>
                
                <div 
                  className="benefit-card"
                  onClick={() => navigate('/seed-subsidies')}
                >
                  <div className="benefit-icon">
                    <FaSeedling />
                  </div>
                  <h5>Seed Subsidies</h5>
                  <p>Government-approved seed subsidies</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bottom-navigation">
        <button 
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavigation('profile')}
        >
          <FaUser className="nav-icon" />
          <span>Profile</span>
        </button>
        
        <button 
          className={`nav-button ${activeTab === 'management' ? 'active' : ''}`}
          onClick={() => handleNavigation('management')}
        >
          <FaTractor className="nav-icon" />
          <span>Management</span>
        </button>
        
        <button 
          className={`nav-button ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => handleNavigation('benefits')}
        >
          <FaTicketAlt className="nav-icon" />
          <span>Benefits</span>
        </button>
      </div>

      {/* More Options Menu */}
      <div className="more-options">
        <h3 className="options-title">More Options</h3>
        
        <div 
          className="option-item"
          onClick={() => navigateTo('/our-culture')}
        >
          <FaInfoCircle className="option-icon" />
          <span>About AgroFresh</span>
        </div>
        
        <div 
          className="option-item"
          onClick={() => navigateTo('/feedback')}
        >
          <FaCommentAlt className="option-icon" />
          <span>Send Feedback</span>
        </div>
        
        <div 
          className="option-item"
          onClick={() => navigateTo('/contact')}
        >
          <FaExclamationTriangle className="option-icon" />
          <span>Report an Issue</span>
        </div>
        
        <div 
          className="option-item"
          onClick={() => navigateTo('/settings')}
        >
          <FaCog className="option-icon" />
          <span>Farm Settings</span>
        </div>
        
        <div 
          className="option-item logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="option-icon" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default FarmerAccountPage;
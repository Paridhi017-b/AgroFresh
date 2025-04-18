import React, { useState, useEffect, useRef } from 'react';
import { 
  FiEdit2, FiTrash2, FiChevronRight, FiMessageSquare, 
  FiBarChart2, FiTruck, FiUser, FiPackage, FiDollarSign, 
  FiStar, FiCalendar, FiTrendingUp, FiDownload, FiPlus 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Farmers.css';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Farmer data for different farmers
const farmersData = {
  ramesh: {
    id: 'ramesh',
    name: "Ramesh Patel",
    location: "Nashik, Maharashtra",
    contact: "+91 9876543210",
    farmName: "Patel Organic Farms",
    farmSize: "12 acres",
    specialization: "Organic Vegetables",
    certification: "India Organic Certified",
    photo: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop",
    joinDate: "March 2020",
    rating: 4.7,
    totalSales: 12500,
    customers: 87
  },
  sunita: {
    id: 'sunita',
    name: "Sunita Reddy",
    location: "Hyderabad, Telangana",
    contact: "+91 8765432109",
    farmName: "Reddy's Spice Farm",
    farmSize: "8 acres",
    specialization: "Spices & Herbs",
    certification: "Organic India",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
    joinDate: "January 2019",
    rating: 4.9,
    totalSales: 18500,
    customers: 112
  },
  vijay: {
    id: 'vijay',
    name: "Vijay Kumar",
    location: "Ludhiana, Punjab",
    contact: "+91 7654321098",
    farmName: "Kumar Wheat Fields",
    farmSize: "20 acres",
    specialization: "Wheat & Rice",
    certification: "FSSAI Certified",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    joinDate: "November 2018",
    rating: 4.5,
    totalSales: 22500,
    customers: 95
  },
  meena: {
    id: 'meena',
    name: "Meena Sharma",
    location: "Jaipur, Rajasthan",
    contact: "+91 6543210987",
    farmName: "Sharma Fruit Orchards",
    farmSize: "15 acres",
    specialization: "Fruits",
    certification: "Organic Certified",
    photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&auto=format&fit=crop",
    joinDate: "July 2021",
    rating: 4.8,
    totalSales: 16500,
    customers: 78
  }
};

// Products data for different farmers
const farmerProducts = {
  ramesh: [
    { 
      id: 1, 
      name: "Tomatoes", 
      variety: "Hybrid 786", 
      quantity: 100, 
      price: 20, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1594282486555-1b5c6b09b9b2?w=800&auto=format&fit=crop",
      plantedDate: "2023-04-15",
      harvestDate: "2023-06-20",
      growthStage: "Fruiting"
    },
    { 
      id: 2, 
      name: "Onions", 
      variety: "Nashik Red", 
      quantity: 200, 
      price: 15, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1587049352840-67d8e6bd4477?w=800&auto=format&fit=crop",
      plantedDate: "2023-05-01",
      harvestDate: "2023-07-15",
      growthStage: "Bulb Formation"
    },
    { 
      id: 3, 
      name: "Cauliflower", 
      variety: "Snowball", 
      quantity: 50, 
      price: 25, 
      status: "sold-out", 
      image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=800&auto=format&fit=crop",
      plantedDate: "2023-03-20",
      harvestDate: "2023-05-30",
      growthStage: "Harvested"
    },
    { 
      id: 4, 
      name: "Okra", 
      variety: "Pusa Sawani", 
      quantity: 75, 
      price: 30, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop",
      plantedDate: "2023-05-10",
      harvestDate: "2023-07-25",
      growthStage: "Flowering"
    }
  ],
  sunita: [
    { 
      id: 1, 
      name: "Turmeric", 
      variety: "Alleppey Finger", 
      quantity: 150, 
      price: 120, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=800&auto=format&fit=crop",
      plantedDate: "2023-03-10",
      harvestDate: "2023-08-15",
      growthStage: "Mature"
    },
    { 
      id: 2, 
      name: "Chilies", 
      variety: "Guntur Sannam", 
      quantity: 80, 
      price: 90, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop",
      plantedDate: "2023-04-05",
      harvestDate: "2023-07-20",
      growthStage: "Fruiting"
    }
  ],
  vijay: [
    { 
      id: 1, 
      name: "Wheat", 
      variety: "Sharbati", 
      quantity: 500, 
      price: 22, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop",
      plantedDate: "2023-11-15",
      harvestDate: "2023-04-10",
      growthStage: "Harvested"
    },
    { 
      id: 2, 
      name: "Basmati Rice", 
      variety: "Pusa 1121", 
      quantity: 300, 
      price: 45, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop",
      plantedDate: "2023-06-20",
      harvestDate: "2023-10-15",
      growthStage: "Planting"
    }
  ],
  meena: [
    { 
      id: 1, 
      name: "Mangoes", 
      variety: "Alphonso", 
      quantity: 200, 
      price: 80, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop",
      plantedDate: "2023-01-15",
      harvestDate: "2023-05-30",
      growthStage: "Fruiting"
    },
    { 
      id: 2, 
      name: "Pomegranates", 
      variety: "Bhagwa", 
      quantity: 150, 
      price: 60, 
      status: "in-stock", 
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop",
      plantedDate: "2023-02-10",
      harvestDate: "2023-08-15",
      growthStage: "Flowering"
    }
  ]
};

const Farmer = ({ farmerId = 'ramesh', onSwitchFarmer }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [products, setProducts] = useState(farmerProducts[farmerId] || []);
  const [orderFilter, setOrderFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    variety: '',
    quantity: 0,
    price: 0,
    status: 'in-stock',
    image: '',
    plantedDate: '',
    harvestDate: '',
    growthStage: ''
  });
  
  const chatContainerRef = useRef(null);
  const farmerData = farmersData[farmerId];

  // Orders data
  const orders = [
    { 
      id: 1023, 
      customer: "Priya Sharma", 
      customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
      product: "Tomatoes", 
      quantity: 10, 
      price: 200, 
      status: "delivered", 
      date: "2023-05-15",
      deliveryAddress: "201, Green Valley, Nashik"
    },
    { 
      id: 1024, 
      customer: "Rahul Verma", 
      customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
      product: "Onions", 
      quantity: 20, 
      price: 300, 
      status: "shipped", 
      date: "2023-05-16",
      deliveryAddress: "45, MG Road, Mumbai"
    },
    { 
      id: 1025, 
      customer: "Neha Gupta", 
      customerImage: "https://randomuser.me/api/portraits/women/68.jpg",
      product: "Cauliflower", 
      quantity: 5, 
      price: 125, 
      status: "pending", 
      date: "2023-05-17",
      deliveryAddress: "12, Hill View, Pune"
    },
    { 
      id: 1026, 
      customer: "Amit Singh", 
      customerImage: "https://randomuser.me/api/portraits/men/75.jpg",
      product: "Okra", 
      quantity: 8, 
      price: 240, 
      status: "processing", 
      date: "2023-05-18",
      deliveryAddress: "33, River Side, Thane"
    }
  ];

  // Filter orders based on selected filter
  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === orderFilter);

  // Earnings data with time filter
  const earningsData = {
    'this-month': {
      earnings: 4200,
      lastPeriod: 3800,
      pending: 850,
      total: 15800,
      monthlyTrend: [3200, 2900, 3500, 3800, 4200],
      monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      productDistribution: {
        labels: ['Tomatoes', 'Onions', 'Cauliflower', 'Okra', 'Others'],
        data: [35, 25, 20, 15, 5]
      }
    },
    'last-month': {
      earnings: 3800,
      lastPeriod: 3500,
      pending: 0,
      total: 15000,
      monthlyTrend: [3000, 2800, 3200, 3500, 3800],
      monthlyLabels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      productDistribution: {
        labels: ['Tomatoes', 'Onions', 'Cauliflower', 'Okra', 'Others'],
        data: [30, 30, 20, 15, 5]
      }
    },
    'this-year': {
      earnings: 12500,
      lastPeriod: 9800,
      pending: 1200,
      total: 15800,
      monthlyTrend: [800, 950, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3200, 3800, 4200],
      monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      productDistribution: {
        labels: ['Tomatoes', 'Onions', 'Cauliflower', 'Okra', 'Others'],
        data: [30, 25, 20, 15, 10]
      }
    },
    'last-year': {
      earnings: 9800,
      lastPeriod: 7500,
      pending: 0,
      total: 12500,
      monthlyTrend: [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1800],
      monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      productDistribution: {
        labels: ['Tomatoes', 'Onions', 'Cauliflower', 'Okra', 'Others'],
        data: [25, 25, 20, 15, 15]
      }
    }
  };

  const currentEarnings = earningsData[timeFilter] || earningsData['this-month'];

  // Feedback data
  const feedbacks = [
    { 
      id: 1, 
      customer: "Priya Sharma", 
      customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "The tomatoes were fresh and sweet, just as described. Delivery was prompt and packaging was excellent. Will definitely order again!", 
      rating: 5, 
      date: "2023-05-10",
      product: "Tomatoes"
    },
    { 
      id: 2, 
      customer: "Rahul Verma", 
      customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Good quality produce. The onions were large and had good shelf life. The delivery was a day late but the produce was worth it.", 
      rating: 4, 
      date: "2023-05-05",
      product: "Onions"
    },
    { 
      id: 3, 
      customer: "Anjali Mehta", 
      customerImage: "https://randomuser.me/api/portraits/women/63.jpg",
      comment: "The cauliflower was fresh and white, perfect for making gobi masala. Loved that it's organically grown!", 
      rating: 5, 
      date: "2023-04-28",
      product: "Cauliflower"
    }
  ];

  // Chart data functions
  const getMonthlyEarningsChartData = () => {
    return {
      labels: currentEarnings.monthlyLabels,
      datasets: [
        {
          label: 'Monthly Earnings (₹)',
          data: currentEarnings.monthlyTrend,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.3
        }
      ]
    };
  };

  const getRevenueByProductChartData = () => {
    return {
      labels: currentEarnings.productDistribution.labels,
      datasets: [
        {
          label: 'Revenue Share (%)',
          data: currentEarnings.productDistribution.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const getProductDistributionChartData = () => {
    return {
      labels: currentEarnings.productDistribution.labels,
      datasets: [
        {
          label: 'Product Distribution',
          data: currentEarnings.productDistribution.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Fetch weather data
  useEffect(() => {
    const mockWeather = {
      temp: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: 12,
      forecast: [
        { day: "Today", high: 30, low: 22, condition: "Partly Cloudy" },
        { day: "Tomorrow", high: 31, low: 23, condition: "Sunny" },
        { day: "Wed", high: 29, low: 23, condition: "Scattered Showers" }
      ]
    };
    setWeather(mockWeather);

    const mockPrices = [
      { commodity: "Tomato", price: 22, unit: "kg", change: "+2.5%" },
      { commodity: "Onion", price: 16, unit: "kg", change: "-1.2%" },
      { commodity: "Cauliflower", price: 26, unit: "kg", change: "+3.8%" },
      { commodity: "Okra", price: 32, unit: "kg", change: "+5.1%" }
    ];
    setMarketPrices(mockPrices);
  }, []);

  // Update products when farmer changes
  useEffect(() => {
    setProducts(farmerProducts[farmerId] || []);
  }, [farmerId]);

  // Handle product deletion
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Handle adding new product
  const handleAddProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      image: newProduct.image || 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop'
    };
    setProducts([...products, productToAdd]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      variety: '',
      quantity: 0,
      price: 0,
      status: 'in-stock',
      image: '',
      plantedDate: '',
      harvestDate: '',
      growthStage: ''
    });
  };

  // Handle export products
  const handleExportProducts = () => {
    // In a real app, this would generate a CSV or PDF
    alert(`Exported ${products.length} products for ${farmerData.name}`);
  };

  // Dashboard metrics
  const dashboardMetrics = [
    { 
      title: "Total Products", 
      value: products.length, 
      icon: <FiPackage size={24} />,
      change: "+2 from last month",
      color: "#4CAF50"
    },
    { 
      title: "Active Orders", 
      value: orders.filter(o => o.status !== 'delivered').length, 
      icon: <FiTruck size={24} />,
      change: "3 new this week",
      color: "#2196F3"
    },
    { 
      title: "Monthly Earnings", 
      value: `₹${currentEarnings.earnings}`, 
      icon: <FiDollarSign size={24} />,
      change: `${((currentEarnings.earnings - currentEarnings.lastPeriod)/currentEarnings.lastPeriod * 100).toFixed(1)}% from last period`,
      color: "#FF9800"
    },
    { 
      title: "Customer Rating", 
      value: farmerData.rating, 
      icon: <FiStar size={24} />,
      change: "0.1 increase this month",
      color: "#FFC107"
    }
  ];

  // Farmer switcher
  const FarmerSwitcher = () => (
    <div className="farmer-switcher">
      <h3>Switch Farmer:</h3>
      <div className="farmer-buttons">
        {Object.keys(farmersData).map(key => (
          <button 
            key={key}
            className={farmerId === key ? 'active' : ''}
            onClick={() => onSwitchFarmer(key)}
          >
            {farmersData[key].name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="farmer-dashboard">
      
      <div className="farmer-dashboard-container">
        {/* Header with notifications */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1>AgroFresh Farmer Portal</h1>
            <div className="header-right">
              <div className="weather-info">
                {weather && (
                  <>
                    <span>{weather.temp}°C</span>
                    <span>{weather.condition}</span>
                  </>
                )}
              </div>
              <div className="notification-badge" onClick={() => setNotificationCount(0)}>
                <span>{notificationCount}</span>
                <svg viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
              </div>
              <div className="farmer-profile">
                <img src={farmerData.photo} alt={farmerData.name} />
                <span>{farmerData.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="dashboard-container">
          {/* Sidebar */}
          <motion.nav 
            className="dashboard-sidebar"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="profile-card">
              <img src={farmerData.photo} alt={farmerData.name} className="profile-image" />
              <h3>{farmerData.name}</h3>
              <p className="farm-name">{farmerData.farmName}</p>
              <div className="farm-details">
                <p><FiUser /> {farmerData.specialization}</p>
                <p><FiTrendingUp /> {farmerData.farmSize}</p>
                <p><FiStar /> {farmerData.rating} Rating</p>
                <p><FiCalendar /> {farmerData.joinDate}</p>
              </div>
            </div>

            <ul className="nav-menu">
              <li 
                className={activeTab === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveTab('dashboard')}
              >
                <FiBarChart2 /> Dashboard
              </li>
              <li 
                className={activeTab === 'products' ? 'active' : ''}
                onClick={() => setActiveTab('products')}
              >
                <FiPackage /> My Products
              </li>
              <li 
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                <FiTruck /> Orders
              </li>
              <li 
                className={activeTab === 'earnings' ? 'active' : ''}
                onClick={() => setActiveTab('earnings')}
              >
                <FiDollarSign /> Earnings
              </li>
              <li 
                className={activeTab === 'feedback' ? 'active' : ''}
                onClick={() => setActiveTab('feedback')}
              >
                <FiStar /> Feedback
              </li>
            </ul>

            <FarmerSwitcher />

            <div 
              className="agrigenie-button"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <FiMessageSquare /> AgriGenie Assistant
            </div>
          </motion.nav>

          {/* Main Content Area */}
          <motion.main 
            className="dashboard-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>Farm Overview</h2>
                  <div className="header-actions">
                    <button className="download-report">
                      <FiDownload /> Download Report
                    </button>
                  </div>
                </div>
                
                <div className="metrics-grid">
                  {dashboardMetrics.map((metric, index) => (
                    <motion.div 
                      key={index}
                      className="metric-card"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      style={{ borderTop: `4px solid ${metric.color}` }}
                    >
                      <div className="metric-icon" style={{ color: metric.color }}>
                        {metric.icon}
                      </div>
                      <div className="metric-content">
                        <h3>{metric.title}</h3>
                        <p className="metric-value">{metric.value}</p>
                        <p className="metric-change">{metric.change}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="chart-row">
                  <div className="chart-container">
                    <h3>Monthly Earnings Trend</h3>
                    <div className="chart-wrapper">
                      <Line 
                        data={getMonthlyEarningsChartData()} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="chart-container">
                    <h3>Revenue by Product</h3>
                    <div className="chart-wrapper">
                      <Bar 
                        data={getRevenueByProductChartData()} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="weather-card">
                    <h3>Weather Forecast</h3>
                    {weather && (
                      <>
                        <div className="current-weather">
                          <div className="temp">{weather.temp}°C</div>
                          <div className="condition">{weather.condition}</div>
                          <div className="details">
                            <span>Humidity: {weather.humidity}%</span>
                            <span>Wind: {weather.wind} km/h</span>
                          </div>
                        </div>
                        <div className="forecast">
                          {weather.forecast.map((day, index) => (
                            <div key={index} className="forecast-day">
                              <span>{day.day}</span>
                              <span>{day.high}°/{day.low}°</span>
                              <span>{day.condition}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="market-card">
                    <h3>Market Prices</h3>
                    <div className="market-table">
                      <div className="table-header">
                        <div>Commodity</div>
                        <div>Price (₹)</div>
                        <div>Change</div>
                      </div>
                      {marketPrices.map((item, index) => (
                        <div key={index} className="table-row">
                          <div>{item.commodity}</div>
                          <div>{item.price}/{item.unit}</div>
                          <div className={`change ${item.change.includes('+') ? 'positive' : 'negative'}`}>
                            {item.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>My Products</h2>
                  <div className="header-actions">
                    <button 
                      className="add-product-btn"
                      onClick={() => setIsAddingProduct(true)}
                    >
                      <FiPlus /> Add Product
                    </button>
                    <button 
                      className="export-btn"
                      onClick={handleExportProducts}
                    >
                      <FiDownload /> Export
                    </button>
                  </div>
                </div>
                
                {/* Add Product Form */}
                {isAddingProduct && (
                  <motion.div 
                    className="add-product-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h3>Add New Product</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input 
                          type="text" 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Variety</label>
                        <input 
                          type="text" 
                          value={newProduct.variety}
                          onChange={(e) => setNewProduct({...newProduct, variety: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Quantity (kg)</label>
                        <input 
                          type="number" 
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price (₹/kg)</label>
                        <input 
                          type="number" 
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={newProduct.status}
                          onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}
                        >
                          <option value="in-stock">In Stock</option>
                          <option value="sold-out">Sold Out</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Planted Date</label>
                        <input 
                          type="date" 
                          value={newProduct.plantedDate}
                          onChange={(e) => setNewProduct({...newProduct, plantedDate: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Harvest Date</label>
                        <input 
                          type="date" 
                          value={newProduct.harvestDate}
                          onChange={(e) => setNewProduct({...newProduct, harvestDate: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Growth Stage</label>
                        <input 
                          type="text" 
                          value={newProduct.growthStage}
                          onChange={(e) => setNewProduct({...newProduct, growthStage: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input 
                          type="text" 
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          placeholder="Leave blank for default image"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button 
                        className="cancel-btn"
                        onClick={() => setIsAddingProduct(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-btn"
                        onClick={handleAddProduct}
                      >
                        Save Product
                      </button>
                    </div>
                  </motion.div>
                )}
                
                <div className="products-grid">
                  {products.map(product => (
                    <motion.div 
                      key={product.id}
                      className={`product-card ${product.status}`}
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="product-image-container">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-growth-stage">
                          {product.growthStage}
                        </div>
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="variety">{product.variety}</p>
                        <div className="product-details">
                          <p><span>Planted:</span> {product.plantedDate}</p>
                          <p><span>Harvest:</span> {product.harvestDate}</p>
                          <p><span>Quantity:</span> {product.quantity} kg</p>
                          <p><span>Price:</span> ₹{product.price}/kg</p>
                        </div>
                        <div className={`status-badge ${product.status}`}>
                          {product.status === 'in-stock' ? 'In Stock' : 'Sold Out'}
                        </div>
                      </div>
                      <div className="product-actions">
                        <button className="edit-btn"><FiEdit2 /></button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>Recent Orders</h2>
                  <div className="order-filters">
                    <button 
                      className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('pending')}
                    >
                      Pending
                    </button>
                    <button 
                      className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('processing')}
                    >
                      Processing
                    </button>
                    <button 
                      className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('shipped')}
                    >
                      Shipped
                    </button>
                    <button 
                      className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('delivered')}
                    >
                      Delivered
                    </button>
                  </div>
                </div>
                
                <div className="orders-table">
                  <div className="table-header">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Product</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Date</div>
                    <div>Action</div>
                  </div>
                  
                  {filteredOrders.map(order => (
                    <motion.div 
                      key={order.id}
                      className="table-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>#{order.id}</div>
                      <div className="customer-cell">
                        <img src={order.customerImage} alt={order.customer} />
                        <span>{order.customer}</span>
                      </div>
                      <div>{order.product} ({order.quantity}kg)</div>
                      <div>₹{order.price}</div>
                      <div>
                        <span className={`status-badge ${order.status}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div>{order.date}</div>
                      <div>
                        <button className="view-btn">
                          View <FiChevronRight />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>Earnings Overview</h2>
                  <div className="time-filters">
                    <button 
                      className={`time-btn ${timeFilter === 'this-month' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('this-month')}
                    >
                      This Month
                    </button>
                    <button 
                      className={`time-btn ${timeFilter === 'last-month' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('last-month')}
                    >
                      Last Month
                    </button>
                    <button 
                      className={`time-btn ${timeFilter === 'this-year' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('this-year')}
                    >
                      This Year
                    </button>
                    <button 
                      className={`time-btn ${timeFilter === 'last-year' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('last-year')}
                    >
                      Last Year
                    </button>
                  </div>
                </div>
                
                <div className="earnings-cards">
                  <motion.div 
                    className="earnings-card total-earnings"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3>Total Earnings</h3>
                    <p className="amount">₹{currentEarnings.total}</p>
                    <p className="info">All time earnings from {farmerData.customers} customers</p>
                  </motion.div>
                  
                  <motion.div 
                    className="earnings-card monthly-earnings"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3>{timeFilter === 'this-month' ? 'This Month' : 
                         timeFilter === 'last-month' ? 'Last Month' : 
                         timeFilter === 'this-year' ? 'This Year' : 'Last Year'}</h3>
                    <p className="amount">₹{currentEarnings.earnings}</p>
                    <p className="info">
                      {currentEarnings.earnings > currentEarnings.lastPeriod ? '↑' : '↓'} 
                      ₹{Math.abs(currentEarnings.earnings - currentEarnings.lastPeriod)} from previous period
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="earnings-card pending-earnings"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3>Pending Payments</h3>
                    <p className="amount">₹{currentEarnings.pending}</p>
                    <p className="info">Will be cleared within 3-5 business days</p>
                  </motion.div>
                </div>
                
                <div className="chart-row">
                  <div className="chart-container full-width">
                    <h3>Monthly Earnings Trend</h3>
                    <div className="chart-wrapper">
                      <Line 
                        data={getMonthlyEarningsChartData()} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="chart-row">
                  <div className="chart-container">
                    <h3>Revenue by Product</h3>
                    <div className="chart-wrapper">
                      <Bar 
                        data={getRevenueByProductChartData()} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="chart-container">
                    <h3>Product Distribution</h3>
                    <div className="chart-wrapper">
                      <Pie 
                        data={getProductDistributionChartData()} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>Customer Feedback</h2>
                  <div className="rating-summary">
                    <div className="average-rating">
                      {farmerData.rating}
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(farmerData.rating) ? 'filled' : ''}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span>from {feedbacks.length} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="feedback-cards">
                  {feedbacks.map(feedback => (
                    <motion.div 
                      key={feedback.id}
                      className="feedback-card"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="feedback-header">
                        <div className="customer-info">
                          <img src={feedback.customerImage} alt={feedback.customer} />
                          <div>
                            <h4>{feedback.customer}</h4>
                            <p className="product">{feedback.product}</p>
                          </div>
                        </div>
                        <div className="rating">
                          {Array(feedback.rating).fill().map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="feedback-text">"{feedback.comment}"</p>
                      <p className="feedback-date">{feedback.date}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.main>

          {/* Chatbot Container */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div 
                className="chatbot-container"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                ref={chatContainerRef}
              >
                <div className="chatbot-header">
                  <h3>AgriGenie Assistant</h3>
                  <button 
                    className="close-chat"
                    onClick={() => setIsChatOpen(false)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="chatbot-content">
                  <div className="chat-placeholder">
                    <p>Chat functionality would appear here if integrated with a chat service.</p>
                    <p>To implement this, you would need to:</p>
                    <ol>
                      <li>Install a chat service like IBM Watson Assistant</li>
                      <li>Configure the chat credentials</li>
                      <li>Implement the chat component</li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
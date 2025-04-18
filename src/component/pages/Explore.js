import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBars, 
  FaUser, 
  FaTags, 
  FaHome,
  FaUtensils, 
  FaStore, 
  FaGift, 
  FaTruck, 
  FaHandsHelping,
  FaFilter, 
  FaSortAmountDown,
  FaSearch,
  FaTimes, 
  FaStar, 
  FaChevronDown 
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import "./Explore.css";
import Navbar from "../Navbar";

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  // Responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to get appropriate image based on category
  const getCategoryImage = (category) => {
    switch(category.toLowerCase()) {
      case 'grocery':
        return "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'organic':
        return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'vegetables':
        return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'dairy':
        return "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'grains':
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'fruits':
        return "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'bakery':
        return "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      case 'meat':
        return "https://images.unsplash.com/photo-1558030136-8e476b6b58e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
      default:
        return "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }
  };

  const stores = [
    { 
      name: "AgroFresh Market", 
      offer: "$5 off", 
      delivery: "30 min", 
      category: "Grocery",
      rating: 4.5,
      products: ["Fresh Vegetables", "Organic Fruits", "Dairy Products"],
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Organic Hub", 
      offer: "In-store prices", 
      delivery: "45 min", 
      category: "Organic",
      rating: 4.2,
      products: ["Organic Vegetables", "Free-range Eggs", "Natural Honey"],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Green Harvest", 
      offer: "$10 off", 
      delivery: "1 hr", 
      category: "Vegetables",
      rating: 4.7,
      products: ["Leafy Greens", "Root Vegetables", "Seasonal Produce"],
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "FarmFresh Dairy", 
      offer: "In-store prices", 
      delivery: "35 min", 
      category: "Dairy",
      rating: 4.3,
      products: ["Milk", "Cheese", "Yogurt", "Butter"],
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Nature's Best", 
      offer: "$15 off", 
      delivery: "50 min", 
      category: "Organic",
      rating: 4.8,
      products: ["Organic Spices", "Herbal Teas", "Cold-pressed Oils"],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Golden Grains", 
      offer: "10% off", 
      delivery: "40 min", 
      category: "Grains",
      rating: 4.1,
      products: ["Whole Wheat", "Rice Varieties", "Lentils"],
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Fruit Paradise", 
      offer: "Buy 1 Get 1", 
      delivery: "25 min", 
      category: "Fruits",
      rating: 4.6,
      products: ["Tropical Fruits", "Seasonal Fruits", "Exotic Varieties"],
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Bakery Delight", 
      offer: "$20 off", 
      delivery: "20 min", 
      category: "Bakery",
      rating: 4.4,
      products: ["Artisan Bread", "Pastries", "Cakes"],
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const filteredStores = stores
    .filter(store => 
      (filter ? store.category === filter : true) &&
      (searchQuery ? store.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (sortBy === "delivery") {
        return parseInt(a.delivery) - parseInt(b.delivery);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const categories = [...new Set(stores.map(store => store.category))];

  return (
    <div className="explore-container">
      {/* Mobile Menu Button */}
     
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`menu-toggle ${isSidebarOpen ? 'hidden' : 'block'}`}
        onClick={toggleSidebar}
      >
        <FaBars className="text-xl" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sidebar"
          >
            <div className="sidebar-header">
              <h2>AgroFresh</h2>
              <button onClick={toggleSidebar} className="close-sidebar">
                <FaTimes />
              </button>
            </div>
            
            <ul className="sidebar-menu">
              {["Home", "Restaurants", "Grocery", "Offers", "Account"].map((category, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="menu-item"
                >

                  {category === "Home" && (
  <Link to="/" className="icon-link">
    <FaHome className="menu-icon" />
  </Link>
)}
{category === "Restaurants" && (
  <Link to="/restaurants" className="icon-link">
    <FaUtensils className="menu-icon" />
  </Link>
)}
{category === "Grocery" && (
  <Link to="/grocery" className="icon-link">
    <FaStore className="menu-icon" />
  </Link>
)}
{category === "Offers" && (
  <Link to="/offers" className="icon-link">
    <FaGift className="menu-icon" />
  </Link>
)}
{category === "Account" && (
  <Link to="/farmer-account" className="icon-link">
    <FaUser className="menu-icon" />
  </Link>
)}

                  <span>{category}</span>
                </motion.li>
              ))}
              
              <motion.li 
                className="menu-item expandable"
                onClick={() => setShowMore(!showMore)}
                whileHover={{ scale: 1.02 }}
              >
                <span>Categories</span>
                <FaChevronDown className={`chevron ${showMore ? 'rotate-180' : ''}`} />
              </motion.li>
              
              <AnimatePresence>
                {showMore && categories.map((category, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`submenu-item ${filter === category ? "active" : ""}`}
                    onClick={() => setFilter(filter === category ? "" : category)}
                  >
                    {category}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products, stores, and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${sortBy === "delivery" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "delivery" ? "" : "delivery")}
            >
              <FaSortAmountDown /> Fastest Delivery
            </button>
            <button 
              className={`filter-btn ${sortBy === "rating" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "rating" ? "" : "rating")}
            >
              <FaStar /> Top Rated
            </button>
          </div>
          
          <button className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>
        </div>

        {/* Category Chips */}
        <div className="category-chips">
          <button 
            className={`chip ${filter === "" ? "active" : ""}`}
            onClick={() => setFilter("")}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`chip ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(filter === category ? "" : category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        {filteredStores.length > 0 ? (
          <div className="stores-grid">
            {filteredStores.map((store, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="store-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="store-image-container">
                  <img src={store.image} alt={store.name} className="store-image" />
                  <div className="store-offer">{store.offer}</div>
                </div>
                <div className="store-info">
                  <h3>{store.name}</h3>
                  <div className="store-meta">
                    <span className="delivery-time">{store.delivery}</span>
                    <span className="rating">
                      <FaStar /> {store.rating}
                    </span>
                  </div>
                  <div className="store-products">
                    {store.products.slice(0, 2).map((product, i) => (
                      <span key={i} className="product-tag">{product}</span>
                    ))}
                    {store.products.length > 2 && (
                      <span className="product-tag">+{store.products.length - 2} more</span>
                    )}
                  </div>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(store.name)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            /* <img src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="No results" /> */
            <h3>No stores found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button onClick={() => {
              setSearchQuery("");
              setFilter("");
            }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Cart Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cart-modal-overlay"
              onClick={toggleCart}
            >
              <motion.div 
                className="cart-modal"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cart-header">
                  <h3>Your Cart ({cartItems.length})</h3>
                  <button onClick={toggleCart} className="close-cart">
                    <FaTimes />
                  </button>
                </div>
                
                {cartItems.length > 0 ? (
                  <>
                    <div className="cart-items">
                      {cartItems.map((item, index) => {
                        const store = stores.find(s => s.name === item);
                        return (
                          <div key={index} className="cart-item">
                           
                            <div className="item-info">
                              <h4>{item}</h4>
                              <span>1 × $10.99</span>
                            </div>
                            <button 
                              className="remove-item"
                              onClick={() => {
                                const newItems = [...cartItems];
                                newItems.splice(index, 1);
                                setCartItems(newItems);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>${(cartItems.length * 10.99).toFixed(2)}</span>
                      </div>
                      <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                  </>
                ) : (
                  <div className="empty-cart">
                    <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Empty cart" />
                    <h4>Your cart is empty</h4>
                    <p>Browse stores and add some fresh products!</p>
                    <button onClick={toggleCart} className="continue-shopping">
                      Continue Shopping
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Explore;








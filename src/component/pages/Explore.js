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

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === productName);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.name === productName 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevItems.filter(item => item.name !== productName);
      }
    });
  };

  const stores = [
    { 
      name: "AgroFresh Market", 
      offer: "₹200 off", 
      delivery: "30 min", 
      category: "Grocery",
      rating: 4.5,
      products: [
        { name: "Fresh Vegetables", price: "50" },
        { name: "Organic Fruits", price: "80" },
        { name: "Dairy Products", price: "60" }
      ],
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Organic Hub", 
      offer: "In-store prices", 
      delivery: "45 min", 
      category: "Organic",
      rating: 4.2,
      products: [
        { name: "Organic Vegetables", price: "70" },
        { name: "Free-range Eggs", price: "120" },
        { name: "Natural Honey", price: "200" }
      ],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Green Harvest", 
      offer: "₹300 off", 
      delivery: "1 hr", 
      category: "Vegetables",
      rating: 4.7,
      products: [
        { name: "Leafy Greens", price: "40" },
        { name: "Root Vegetables", price: "35" },
        { name: "Seasonal Produce", price: "45" }
      ],
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Daily Dairy", 
      offer: "₹150 cashback", 
      delivery: "20 min", 
      category: "Dairy",
      rating: 4.3,
      products: [
        { name: "Milk 1L", price: "55" },
        { name: "Paneer 200g", price: "75" },
        { name: "Curd 500g", price: "50" }
      ],
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Fruit Basket", 
      offer: "Buy 1 Get 1 Free", 
      delivery: "35 min", 
      category: "Fruits",
      rating: 4.6,
      products: [
        { name: "Apples (1kg)", price: "90" },
        { name: "Bananas (1 dozen)", price: "60" },
        { name: "Grapes (500g)", price: "75" }
      ],
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      name: "Nature's Basket", 
      offer: "₹100 off above ₹500", 
      delivery: "50 min", 
      category: "All-in-one",
      rating: 4.4,
      products: [
        { name: "Mixed Dry Fruits", price: "250" },
        { name: "Multigrain Bread", price: "60" },
        { name: "Fresh Herbs Pack", price: "40" }
      ],
      image: "data:image/jpeg;base64,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"
    },{
      name: "Agro Grains Depot",
      offer: "Up to ₹100 off",
      delivery: "40 min",
      category: "Grains & Pulses",
      rating: 4.6,
      products: [
        { name: "Organic Basmati Rice", price: 120 },
        { name: "Unpolished Toor Dal", price: 90 },
        { name: "Chana Dal (Direct from farm)", price: 85 }
      ],
      image: "https://media.istockphoto.com/id/659524906/photo/composition-with-variety-of-vegetarian-food-ingredients.jpg?s=612x612&w=0&k=20&c=AzFdpJXWAVArpzTxJxhUqCENYcYb2ozltPhYaYJAkFQ="
    },
    
    {
      name: "Farm Fresh Naturals",
      offer: "Flat ₹50 off",
      delivery: "35 min",
      category: "Natural & Homemade",
      rating: 4.8,
      products: [
        { name: "Raw Forest Honey", price: 250 },
        { name: "Cold-pressed Mustard Oil", price: 180 },
        { name: "Jaggery (Gud) Blocks & Powder", price: 100 }
      ],
      image: "data:image/jpeg;base64,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"
    },
    
    
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

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
              <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
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
                      <div key={i} className="product-item">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">₹{product.price}</span>
                        <button 
                          className="add-product-btn"
                          onClick={() => addToCart(product)}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                    {store.products.length > 2 && (
                      <span className="product-tag">+{store.products.length - 2} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-results">
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
                  <h3>Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h3>
                  <button onClick={toggleCart} className="close-cart">
                    <FaTimes />
                  </button>
                </div>
                
                {cartItems.length > 0 ? (
                  <>
                    <div className="cart-items">
                      {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <div className="quantity-controls">
                              <button onClick={() => removeFromCart(item.name)}>-</button>
                              <span>{item.quantity} × ₹{item.price}</span>
                              <button onClick={() => addToCart(item)}>+</button>
                            </div>
                            <span className="item-total">₹{item.quantity * item.price}</span>
                          </div>
                          <button 
                            className="remove-item"
                            onClick={() => {
                              const newItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                              setCartItems(newItems);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                  </>
                ) : (
                  <div className="empty-cart">
                    <img src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg" alt="Empty cart" />
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
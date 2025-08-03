import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Error loading products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories for filters
  const categories = [...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product =>
      (filter ? product.category === filter : true) &&
      (searchQuery ? 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.farmer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
    )
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

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
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { 
          ...product, 
          quantity: 1,
          image: product.image_url 
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item.id !== productId);
      }
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/payment', {
      state: {
        cartItems,
        totalAmount: calculateTotal()
      }
    });
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
      <div className={`hamburger-wrapper ${isSidebarOpen ? 'hide' : ''}`} onClick={toggleSidebar}>
        <FaBars />
      </div>

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
              {["Home", "Account"].map((category, index) => (
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
              placeholder="Search products, farmers, and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${sortBy === "price-low" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "price-low" ? "" : "price-low")}
            >
              <FaSortAmountDown /> Price: Low to High
            </button>
            <button
              className={`filter-btn ${sortBy === "price-high" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "price-high" ? "" : "price-high")}
            >
              <FaSortAmountDown /> Price: High to Low
            </button>
            <button
              className={`filter-btn ${sortBy === "name" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "name" ? "" : "name")}
            >
              <FaSortAmountDown /> Name
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

        {/* Products Grid */}
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="product-image-container">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="product-image" />
                  ) : (
                    <div className="product-image-placeholder">
                      <FaUtensils className="placeholder-icon" />
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-price">₹{product.price}</span>
                    <span className="product-quantity">Available: {product.available_quantity}</span>
                  </div>
                  <div className="product-footer">
                    <span className="product-farmer">
                      <FaStore /> {product.farmer_name}
                    </span>
                    <span className="product-category">
                      <FaTags /> {product.category}
                    </span>
                  </div>
                  <button
                    className="add-product-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.available_quantity <= 0}
                  >
                    {product.available_quantity <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button onClick={() => {
              setSearchQuery("");
              setFilter("");
              setSortBy("");
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
                      {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                          <div className="item-info">
                           
                            <div>
                              <h4>{item.name}</h4>
                              <div className="quantity-controls">
                                <button onClick={() => removeFromCart(item.id)}>-</button>
                                <span>{item.quantity} × ₹{item.price}</span>
                                <button onClick={() => addToCart(item)}>+</button>
                              </div>
                              <span className="item-total">₹{(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            className="remove-item"
                            onClick={() => {
                              setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
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
                        <span>₹{calculateTotal().toFixed(2)}</span>
                      </div>
                      <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-cart">
                    <img src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg" alt="Empty cart" />
                    <h4>Your cart is empty</h4>
                    <p>Browse products and add some fresh items!</p>
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
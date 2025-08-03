import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './FarmerProductManagement.css';

const FarmerProductManagement = () => {
  const location = useLocation();
  const farmerId = location.state?.farmerId;
  const farmerName = location.state?.farmerName;
  
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Vegetables',
    availableQuantity: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Herbs', 'Other'];

  useEffect(() => {
    if (farmerId) {
      fetchProducts();
    }
  }, [farmerId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/farmer/${farmerId}/products`);
      setProducts(response.data.products);
      setError('');
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(`Failed to fetch products: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      setError('Name, price and category are required');
      return;
    }

    // Validate price is a positive number
    if (isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) {
      setError('Price must be a valid positive number');
      return;
    }

    try {
      setLoading(true);
      
      const productData = {
        farmerId,
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        availableQuantity: parseInt(newProduct.availableQuantity) || 0,
        imageUrl: newProduct.imageUrl.trim() || null,
        farmerName: farmerName || `Farmer ${farmerId}`
      };

      console.log('Submitting product:', productData); // Debug log

      const response = await axios.post(
        'http://localhost:5000/api/farmer/products', 
        productData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add product');
      }

      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'Vegetables',
        imageUrl: '',
        availableQuantity: ''
      });
      
      // Refresh the product list
      await fetchProducts();
      
    } catch (error) {
      console.error('Full error details:', error);
      const errorMessage = error.response?.data?.error?.sqlMessage || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to add product. Please try again.';
      
      setError(errorMessage);
      
      if (error.response?.data?.error) {
        console.error('Server error details:', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(prev => ({ ...prev, [productId]: true }));
      
      console.log('Deleting product:', productId); // Debug log
      const response = await axios.delete(
        `http://localhost:5000/api/farmer/products/${productId}`,
        { 
          data: { farmerId },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Optimistic UI update
        setProducts(prev => prev.filter(p => p.id !== productId));
      }
    } catch (error) {
      console.error('Delete error details:', error);
      setError(error.response?.data?.message || 'Failed to delete product. Please try again.');
      
      // Refresh to ensure UI matches server state
      await fetchProducts();
    } finally {
      setDeleteLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (!farmerId) {
    return (
      <div className="farmer-product-management">
        <h2>Farmer Dashboard</h2>
        <p>Please log in as a farmer to manage your products.</p>
      </div>
    );
  }

  return (
    <div className="farmer-product-management">
      <h2>Manage Your Products</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="dismiss-error">
            ×
          </button>
        </div>
      )}
      
      <div className="product-form-container">
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
              minLength="2"
              maxLength="100"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              maxLength="500"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)*</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Available Quantity</label>
              <input
                type="number"
                name="availableQuantity"
                value={newProduct.availableQuantity}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category*</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                pattern="https?://.+\.(jpg|jpeg|png|gif|webp|svg|bmp)$"
                title="Enter a valid image URL (jpg, png, gif, webp, svg, bmp)"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="add-product-btn" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Adding...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>

      <div className="product-list-container">
        <h3>Your Products</h3>
        {loading && products.length === 0 ? (
          <div className="loading-spinner">Loading products...</div>
        ) : products.length === 0 ? (
          <p className="no-products">No products added yet.</p>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="product-image" 
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>
                <div className="product-details">
                  <div className="product-header">
                    <h4>{product.name}</h4>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      disabled={deleteLoading[product.id]}
                      className="delete-btn"
                    >
                      {deleteLoading[product.id] ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                  <p className="product-description">{product.description || 'No description'}</p>
                  <div className="product-meta">
                    <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Available:</strong> {product.available_quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProductManagement;
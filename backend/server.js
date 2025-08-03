const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const crypto = require('crypto');
const axios = require('axios');
const { Cashfree } = require('cashfree-pg');
require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer")
const app = express();



// Enhanced CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Parse incoming JSON
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'meraSecretCode',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// MySQL connection
const db = mysql.createConnection({
  connectionLimit: 10,
  host: "sql12.freesqldatabase.com",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", database: "connected" });
});

// Signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO signin (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("❌ Error while signing up:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ success: false, message: "Email already exists" });
      }
      return res.status(500).json({ success: false, message: "Database error" });
    }
    return res.status(201).json({ success: true, message: "User created successfully" });
  });
});

// Signin route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM signin WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Error while signing in:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (results.length > 0) {
      req.session.user = {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email
      };
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.session.user
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Profile route
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  res.json({ success: true, user: req.session.user });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// Farmer registration route
// Route: Register Farmer
app.post("/register-farmer", (req, res) => {
  const { fullName, email, phone, farmLocation, produceType } = req.body;

  if (!fullName || !email || !phone || !farmLocation || !produceType) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO farmers (full_name, email, phone_number, farm_location, produce_type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, phone, farmLocation, produceType], (err, result) => {
    if (err) {
      console.error("❌ Error while registering farmer:", err.message);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.status(201).json({ success: true, message: "Farmer registered successfully" });
  });
});

// Route: Get Farmer by Email
app.get("/get-farmer", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const sql = "SELECT * FROM farmers WHERE email = ?";
  db.query(sql, [email], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching farmer:", err.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (rows.length > 0) {
      res.json({ success: true, farmer: rows[0] });
    } else {
      res.status(404).json({ success: false, message: "Farmer not found" });
    }
  });
});

// Route: Submit Feedback
app.post("/submit-feedback", (req, res) => {
  const { name, email, message, farmerEmail } = req.body;

  if (!name || !email || !message || !farmerEmail) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO feedback (name, email, message, farmer_email)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, message, farmerEmail], (err, result) => {
    if (err) {
      console.error("❌ Error inserting feedback:", err.message);
      return res.status(500).json({ success: false, message: "Failed to submit feedback" });
    }

    res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  });
});

// Route: Get Feedback by Farmer Email
app.get("/get-feedback", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Farmer email is required" });
  }

  const sql = `
    SELECT * FROM feedback
    WHERE farmer_email = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ Error fetching feedback:", err.message);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, feedback: results });
  });
});


// Contact Us form submission
app.post("/contactus", (req, res) => {
  const { fullName, emailAddress, phoneNumber, message } = req.body;

  const sql = `
    INSERT INTO contact_messages (full_name, email_address, phone_number, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [fullName, emailAddress, phoneNumber, message], (err, result) => {
    if (err) {
      console.error("❌ Error while saving contact form:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    return res.status(200).json({ success: true, message: "Message received successfully" });
  });
});

// Premium membership registration
app.post("/premium-join", (req, res) => {
  const { name, email, phone, farmSize, paymentMethod } = req.body;

  if (!name || !email || !farmSize || !paymentMethod) {
    return res.status(400).json({ success: false, message: "All required fields must be filled." });
  }

  const sql = `
    INSERT INTO FarmerPremiumMembership (full_name, email_address, phone_number , farm_size_acres , payment_method)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, farmSize, paymentMethod], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, message: "User successfully registered as a premium member" });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

//forgotpassword
let resetTokens = {}; // globally at the top of server.js

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM signin WHERE email = ?";
  
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    
    // Generate token and store it
    const token = Math.random().toString(36).substring(2, 15);
    resetTokens[token] = email;
    
    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
    
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    const mailOptions = {
      from: `"AgroFresh Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Link",
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this, please ignore this email.</p>
      `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email send error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      
      console.log("✅ Email sent:", info.response);
      res.json({ message: "Password reset link has been sent to your email." });
    });
  });
});
app.post("/api/reset-password", (req, res) => {
  const { token, newPassword } = req.body;

  // Check if token is valid
  const email = resetTokens[token];
  if (!email) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  // Update password in database
  const sql = "UPDATE signin SET password = ? WHERE email = ?";
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) {
      console.error("❌ Error updating password:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Remove used token
    delete resetTokens[token];

    return res.json({ message: "Password successfully updated" });
  });
});


// Cashfree configuration
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || 'TEST10612544c91b7cb5c69641e6c87e44521601';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'cfsk_ma_test_1fc67a5333609afed9894919666de76b_3d1a6602';
const CASHFREE_API_BASE = 'https://sandbox.cashfree.com/pg';

app.post('/create-order', async (req, res) => {
  try {
    const { amount, customer_email, customer_name, cartItems } = req.body;

    // Generate professional order ID
    const order_id = `AGRO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const customer_id = req.session.user?.id || `cust-${Date.now()}`;

    const customerEmail = customer_email || req.session.user?.email || "customer@agrofresh.com";
    const customerName = customer_name || req.session.user?.name || "Customer";

    const orderData = {
      order_id,
      order_amount: amount.toString(),
      order_currency: "INR",
      customer_details: {
        customer_id,
        customer_email: customerEmail,
        customer_phone: "9999999999",
        customer_name: customerName
      },
      order_meta: {
        return_url: `http://localhost:3000/payment-success?order_id=${order_id}`,
        notify_url: "http://localhost:5000/payment-webhook"
      },
      order_note: "AgroFresh Organic Products Purchase"
    };

    // Save order to database
    const saveOrderSQL = `
      INSERT INTO orders 
      (order_id, customer_id, amount, status, customer_email, customer_name, items)
      VALUES (?, ?, ?, 'pending', ?, ?, ?)
    `;

    db.query(saveOrderSQL, [
      order_id,
      customer_id,
      amount,
      customerEmail,
      customerName,
      JSON.stringify(cartItems || [])
    ], (err) => {
      if (err) {
        console.error("Error saving order:", err);
        return res.status(500).json({ success: false, error: 'Database error while saving order' });
      }
    });

    // Process payment with Cashfree
    const headers = {
      'x-client-id': CASHFREE_APP_ID,
      'x-client-secret': CASHFREE_SECRET_KEY,
      'x-api-version': '2022-09-01',
      'Content-Type': 'application/json'
    };

    const response = await axios.post(`${CASHFREE_API_BASE}/orders`, orderData, { headers });

    res.json({
      success: true,
      order_id: response.data.order_id,
      payment_session_id: response.data.payment_session_id,
      customer_details: orderData.customer_details
    });

  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Payment initialization failed',
      details: error.response?.data || error.message
    });
  }
});










//farmer login
app.post("/farmer-login", (req, res) => {
  const { email, phone_number } = req.body;

  console.log("Received login data:", req.body); // DEBUG

  if (!email || !phone_number) {
    return res.status(400).json({
      success: false,
      message: "Both email and phone number are required",
    });
  }

const sql = "SELECT * FROM farmers WHERE email = ? AND phone_number = ?";
  const params = [email, phone_number];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No farmer found with these credentials",
      });
    }

    const farmer = results[0];
    req.session.farmerId = farmer.id;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      farmer: {
        id: farmer.id,
        name: farmer.full_name,  // Use correct DB column
        email: farmer.email,
        phone_number: farmer.phone_number,
      },
    });
  });
});





















// // Updated product endpoints
// app.post('/api/farmer/products', (req, res) => {
//   const { farmerId, name, description, price, category, imageUrl, availableQuantity } = req.body;
  
//   if (!farmerId || !name || !price || !category) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Missing required fields",
//       required: ['farmerId', 'name', 'price', 'category']
//     });
//   }

//   // Validate price and quantity are numbers
//   if (isNaN(price)) {

//     return res.status(400).json({ 
//       success: false, 
//       message: "Price must be a number" 
//     });
//   }

//   const sql = `
//     INSERT INTO products (farmer_id, name, description, price, category, image_url, available_quantity)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [
//     farmerId, 
//     name, 
//     description, 
//     parseFloat(price), 
//     category, 
//     imageUrl || null, 
//     parseInt(availableQuantity) || 0
//   ], (err, result) => {
//     if (err) {
//       console.error("Error adding product:", err);
//       return res.status(500).json({ 
//         success: false, 
//         message: "Failed to add product",
//         error: err.message 
//       });
//     }
//     res.json({ 
//       success: true, 
//       message: "Product added successfully", 
//       productId: result.insertId 
//     });
//   });
// });

// // Get farmer's products with better error handling
// app.get('/api/farmer/:farmerId/products', (req, res) => {
//   const { farmerId } = req.params;
  
//   if (!farmerId || isNaN(farmerId)) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Invalid farmer ID" 
//     });
//   }

//   const sql = "SELECT * FROM products WHERE farmer_id = ?";
//   db.query(sql, [farmerId], (err, results) => {
//     if (err) {
//       console.error("Error fetching farmer products:", err);
//       return res.status(500).json({ 
//         success: false, 
//         message: "Failed to fetch products",
//         error: err.message 
//       });
//     }
//     res.json({ 
//       success: true, 
//       products: results 
//     });
//   });
// });















// app.post('/api/farmer/products', (req, res) => {
//   const { farmerId, name, description, price, category, imageUrl, availableQuantity, farmerName } = req.body;
  
//   if (!farmerId || !name || !price || !category) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Missing required fields",
//       required: ['farmerId', 'name', 'price', 'category']
//     });
//   }

//   const sql = `
//     INSERT INTO products (farmer_id, name, description, price, category, image_url, available_quantity, farmer_name)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [
//     farmerId, 
//     name, 
//     description, 
//     parseFloat(price), 
//     category, 
//     imageUrl || null, 
//     parseInt(availableQuantity) || 0,
//     farmerName || `Farmer ${farmerId}`
//   ], (err, result) => {
//     if (err) {
//       console.error("Error adding product:", err);
//       return res.status(500).json({ 
//         success: false, 
//         message: "Failed to add product",
//         error: err.message 
//       });
//     }
//     res.json({ 
//       success: true, 
//       message: "Product added successfully", 
//       productId: result.insertId 
//     });
//   });
// });

// // Add this endpoint to your server code
// app.get('/api/products', (req, res) => {
//   const sql = "SELECT * FROM products";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       return res.status(500).json({ 
//         success: false, 
//         message: "Failed to fetch products",
//         error: err.message 
//       });
//     }
//     res.json({ 
//       success: true, 
//       products: results 
//     });
//   });
// });


// // Get farmer's products
// app.get('/api/farmer/:farmerId/products', (req, res) => {
//   const { farmerId } = req.params;
  
//   if (!farmerId || isNaN(farmerId)) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Invalid farmer ID" 
//     });
//   }

//   const sql = "SELECT * FROM products WHERE farmer_id = ?";
//   db.query(sql, [farmerId], (err, results) => {
//     if (err) {
//       console.error("Error fetching farmer products:", err);
//       return res.status(500).json({ 
//         success: false, 
//         message: "Failed to fetch products",
//         error: err.message 
//       });
//     }
//     res.json({ 
//       success: true, 
//       products: results 
//     });
//   });
// });















// Farmer Product Endpoints

// Add product
app.post('/api/farmer/products', (req, res) => {
  const { farmerId, name, description, price, category, imageUrl, availableQuantity, farmerName } = req.body;
  
  // Add console.log to see what's being received
  console.log('Received product data:', req.body);

  if (!farmerId || !name || !price || !category) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields" 
    });
  }

  const sql = `
    INSERT INTO products 
    (farmer_id, name, description, price, category, image_url, available_quantity, farmer_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    farmerId, 
    name, 
    description || null, 
    parseFloat(price), 
    category, 
    imageUrl || null, 
    parseInt(availableQuantity) || 0,
    farmerName || `Farmer ${farmerId}`
  ];

  console.log('Executing SQL:', sql, 'with values:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Full error object:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Database operation failed",
        errorDetails: {
          code: err.code,
          errno: err.errno,
          sqlState: err.sqlState,
          sqlMessage: err.sqlMessage,
          sql: err.sql
        }
      });
    }
    
    res.json({ 
      success: true, 
      message: "Product added successfully", 
      productId: result.insertId 
    });
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products",
        error: err.message 
      });
    }
    res.json({ 
      success: true, 
      products: results 
    });
  });
});

// Get farmer's products
app.get('/api/farmer/:farmerId/products', (req, res) => {
  const { farmerId } = req.params;
  
  if (!farmerId || isNaN(farmerId)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid farmer ID" 
    });
  }

  const sql = "SELECT * FROM products WHERE farmer_id = ?";
  db.query(sql, [farmerId], (err, results) => {
    if (err) {
      console.error("Error fetching farmer products:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products",
        error: err.message 
      });
    }
    res.json({ 
      success: true, 
      products: results 
    });
  });
});

// Delete product
app.delete('/api/farmer/products/:productId', (req, res) => {
  const { productId } = req.params;
  const { farmerId } = req.body;

  if (!productId || !farmerId) {
    return res.status(400).json({ 
      success: false, 
      message: "Product ID and Farmer ID are required" 
    });
  }

  const sql = "DELETE FROM products WHERE id = ? AND farmer_id = ?";
  db.query(sql, [productId, farmerId], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to delete product",
        error: err.message 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found or not owned by farmer" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  });
});

// Farmer login
app.post("/farmer-login", (req, res) => {
  const { email, phone_number } = req.body;

  if (!email || !phone_number) {
    return res.status(400).json({
      success: false,
      message: "Both email and phone number are required",
    });
  }

  const sql = "SELECT * FROM farmers WHERE email = ? AND phone_number = ?";
  db.query(sql, [email, phone_number], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No farmer found with these credentials",
      });
    }

    const farmer = results[0];
    return res.status(200).json({
      success: true,
      message: "Login successful",
      farmer: {
        id: farmer.id,
        name: farmer.full_name,
        email: farmer.email,
        phone_number: farmer.phone_number,
      },
    });
  });
});
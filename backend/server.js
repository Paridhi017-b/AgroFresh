const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

// ✅ Session setup
app.use(session({
  secret: 'meraSecretCode',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // set true if using https
    httpOnly: true,
    sameSite: 'lax'       // 'lax' is safe for most dev cases
  }
}));

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12777507",
  password: "eHzBTq3yFA",
  database: "sql12777507",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", database: "connected" });
});

// ✅ Signup
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
    return res.status(200).json({ success: true });
  });
});

// ✅ Signin with session
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
      return res.status(200).json({ success: true, message: "Login successful" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// ✅ Profile (protected)
app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// ✅ Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// ✅ Farmer registration
app.post("/register-farmer", (req, res) => {
  const { fullName, email, phone, farmLocation, produceType } = req.body;

  const sql = `
    INSERT INTO farmers (full_name, email, phone_number, farm_location, produce_type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, phone, farmLocation, produceType], (err, result) => {
    if (err) {
      console.error("❌ Error while registering farmer:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    return res.status(200).json({ success: true, message: "Farmer registered successfully" });
  });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Contact Us form submission
app.post("/contactus", (req, res) => {
  const { fullName, emailAddress, phoneNumber, message } = req.body;

  const sql = `
    INSERT INTO contactus (full_name, email_address, phone_number, message)
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

app.post("/premium-join", (req, res) => {
  const { name, email, phone, farmSize, paymentMethod } = req.body;

  if (!name || !email || !farmSize || !paymentMethod) {
    return res.status(400).json({ success: false, message: "All required fields must be filled." });
  }

  const sql = `
    INSERT INTO premium_members (name, email, phone, farm_size, payment_method)
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

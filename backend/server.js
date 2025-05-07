const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
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

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", database: "connected" });
});

// Signup route (for login system)
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

// Signin route (for login system)
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM signin WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Error while signing in:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (results.length > 0) {
      return res.status(200).json({ success: true, user: results[0] });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Farmer Registration route
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

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
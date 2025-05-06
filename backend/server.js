const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "agrofresh",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'connected' });
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
    return res.status(200).json({ success: true });
  });
});

// Login route
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

// ✅ Server runs on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

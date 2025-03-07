const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_secret_key"; // Change this in production

// User Registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    try {
        await db.execute(sql, [username, hashedPassword]);
        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// User Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    try {
        const [results] = await db.execute(sql, [username]);
        if (results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Stock Entry
app.post("/add-stock", async (req, res) => {
    const { user_id, crop_name, quantity } = req.body;

    const sql = "INSERT INTO stocks (user_id, crop_name, quantity) VALUES (?, ?, ?)";
    try {
        await db.execute(sql, [user_id, crop_name, quantity]);
        res.json({ message: "Stock added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Stock Data
app.get("/stocks/:user_id", async (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT * FROM stocks WHERE user_id = ?";
    try {
        const [results] = await db.execute(sql, [user_id]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));

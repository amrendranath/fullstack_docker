const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const FLASK_BACKEND_URL =
  process.env.FLASK_BACKEND_URL || "http://localhost:5000";

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("form", { error: null });
});

app.get("/form", (req, res) => {
  res.render("form", { error: null });
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.render("form", { error: "Both fields are required." });
    }

    // Send data to Flask backend
    const response = await axios.post(
      `${FLASK_BACKEND_URL}/submit`,
      {
        name: name,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      res.render("success", { name: name, email: email });
    } else {
      res.render("form", { error: "Failed to submit data to backend." });
    }
  } catch (error) {
    console.error("Error submitting to backend:", error.message);
    res.render("form", { error: "Error connecting to backend service." });
  }
});

app.get("/api/submissions", async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_BACKEND_URL}/api`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from backend:", error.message);
    res.status(500).json({ error: "Error fetching data from backend" });
  }
});

app.get("/success", (req, res) => {
  res.render("success", { name: "User", email: "user@example.com" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "frontend",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend server running on port ${PORT}`);
  console.log(`Flask backend URL: ${FLASK_BACKEND_URL}`);
});

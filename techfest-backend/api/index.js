const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();
connectDB(); // Connect to the database

const allowedOrigins = [
  "http://localhost:3000",
  "https://techfest-frontend-psi.vercel.app"
];

// ✅ Middleware to manually set CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// ✅ Use Express JSON Middleware
app.use(express.json());

// ✅ Import routes AFTER setting up CORS
const eventRoutes = require("../routes/eventRoutes");
app.use("/api/events", eventRoutes);

// ✅ Default API response
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Techfest API" });
});

// ✅ Vercel Serverless Export
module.exports = app;

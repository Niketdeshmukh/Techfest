const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();
connectDB(); // Connect to the database

const allowedOrigins = [
  "http://localhost:3000",
  "https://techfest-frontend-psi.vercel.app"
];

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

app.use(express.json());

const eventRoutes = require("../routes/eventRoutes");
app.use("/api/events", eventRoutes);

// ✅ Default API response
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Techfest API" });
});
const PORT = process.env.PORT || 5000; // Use Render-provided PORT

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
module.exports = app;

const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://techfest-frontend-psi.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  })
);

app.use(express.json()); // Middleware for parsing JSON

connectDB(); // Connect to database

// ✅ Import routes AFTER setting up CORS
const eventRoutes = require('../routes/eventRoutes');
app.use('/api/events', eventRoutes);

// ✅ Default API response
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the Techfest API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ✅ Export handler for Vercel deployment
module.exports = app;

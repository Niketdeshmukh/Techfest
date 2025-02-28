const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "https://techfest-frontend-psi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());

// Import routes
const eventRoutes = require('../routes/eventRoutes');
app.use('/api/events', eventRoutes);

// Default API response
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the Techfest API" });
});

// Export handler for Vercel
module.exports = app;

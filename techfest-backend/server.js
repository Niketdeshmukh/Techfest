const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/competitions", express.static(path.join(__dirname, "competitions")));

// Routes
app.use("/api", eventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
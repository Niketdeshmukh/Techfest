const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", eventRoutes);
app.post("/api/users", async (req, res) => {
    try {
      const { name, email, role } = req.body;
      const user = new User({ name, email, role });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

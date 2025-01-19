const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Allow requests from your frontend's origin
app.use(cors({
  origin: 'https://techfest-frontend-psi.vercel.app' // Replace with your frontend's URL
}));

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://niketdeshmukh2002:mytechfest@cluster0.nyirc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Your existing middleware and routes
app.use(express.json());
app.use('/api/events', require('./routes/eventRoutes'));

// Add a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Techfest API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
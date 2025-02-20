const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: ['https://techfest-frontend-psi.vercel.app'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/events', require('./routes/eventRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the Techfest API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

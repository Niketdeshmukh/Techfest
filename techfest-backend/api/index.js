const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://techfest-frontend-psi.vercel.app' }));
app.use(express.json());

const eventRoutes = require('../routes/eventRoutes');
app.use('/api/events', eventRoutes);

module.exports = app;

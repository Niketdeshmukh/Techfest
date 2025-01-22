const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Search registered events by phone number
router.post('/registered', async (req, res) => {
  const { phone } = req.body;
  try {
    const events = await Event.find({ registered_users: phone });
    if (!events.length) {
      return res.status(404).json({ error: 'No registered events found' });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registered events' });
  }
});

// Register user for an event
router.post('/register', async (req, res) => {
  const { name, lastname, email, gender, enrollment, phone, age, event_id } = req.body;
  try {
    const event = await Event.findOne({ event_id });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.registered_users.includes(phone)) {
      return res.status(400).json({ error: 'You have already registered for this event' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      const newUser = new User({ name, lastname, email, gender, enrollment, phone, age });
      await newUser.save();
    }

    event.registered_users.push(phone);
    await event.save();

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Failed to register for the event', details: error.message });
    }
  }
});

// Export the handler for Vercel
module.exports = (req, res) => {
  const app = express();
  app.use(express.json());
  app.use('/api/events', router);
  return app(req, res);
};

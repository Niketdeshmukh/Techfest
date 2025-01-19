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
    console.log('Received registration request:', req.body);

    const event = await Event.findOne({ event_id });
    if (!event) {
      console.error('Event not found:', event_id);
      return res.status(404).json({ error: 'Event not found' });
    }

    // Log the registered users and the phone number being checked
    console.log('Registered users for event:', event.registered_users);
    console.log('Phone number being checked:', phone);

    // Ensure the phone number is not already in the registered_users array
    if (event.registered_users.includes(phone)) {
      console.log('User already registered for the event:', phone);
      return res.status(400).json({ error: 'You have already registered for this event' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      const newUser = new User({ name, lastname, email, gender, enrollment, phone, age });
      await newUser.save();
      console.log('User saved:', newUser);
    }

    // Add detailed logging before adding the phone number
    console.log('Adding phone number to registered_users array:', phone);
    event.registered_users.push(phone);
    await event.save();
    console.log('Event updated with new user:', event);

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Error occurred:', error);
    if (error.code === 11000) {
      console.error('Duplicate key error:', error.message);
      return res.status(400).json({ error: 'Email already registered' });
    } else {
      console.error('Failed to register for the event:', error);
      res.status(500).json({ error: 'Failed to register for the event', details: error.message });
    }
  }
});

module.exports = router;
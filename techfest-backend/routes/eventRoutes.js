const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Search registered events by phone number
router.post("/events/registered", async (req, res) => {
  const { phone } = req.body;
  try {
    const events = await Event.find({ registered_users: phone });
    if (!events.length) {
      return res.status(404).json({ error: "No registered events found" });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registered events" });
  }
});

// Register user for an event
router.post("/events/register", async (req, res) => {
  const { phone, event_id } = req.body;
  try {
    const event = await Event.findOne({ event_id });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (!event.registered_users.includes(phone)) {
      event.registered_users.push(phone);
      await event.save();
    }
    res.status(200).json({ message: "Successfully registered for the event" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register for the event" });
  }
});

module.exports = router;

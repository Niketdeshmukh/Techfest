const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");

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
  const { name, lastname, email, gender, enrollment, phone, age, event_id } = req.body;

  try {
    console.log("Received registration request:", req.body);

    // Fetch the event by event_id
    const event = await Event.findOne({ event_id });
    if (!event) {
      console.error("Event not found:", event_id);
      return res.status(404).json({ error: "Event not found" });
    }

    // Log the registered users and the phone number being checked
    console.log("Registered users for event:", event.registered_users);
    console.log("Phone number being checked:", phone);

    // Check if the user is already registered
    if (event.registered_users.includes(phone)) {
      console.log("User already registered for the event:", phone);
      return res.status(400).json({ error: "You have already registered for this event" });
    }

    // Check if the user exists in the User collection, otherwise create a new user
    const user = await User.findOne({ phone });
    if (!user) {
      const newUser = new User({ name, lastname, email, gender, enrollment, phone, age });
      await newUser.save();
      console.log("User saved:", newUser);
    }

    // Add the phone number to the registered_users array
    console.log("Adding phone number to registered_users array:", phone);
    event.registered_users.push(phone);
    await event.save();
    console.log("Event updated with new user:", event);

    // Send a success response
    return res.status(200).json({ message: "Successfully registered for the event" });
    
  } catch (error) {
    console.error("Error occurred:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      console.error("Duplicate key error:", error.message);
      return res.status(400).json({ error: "Email already registered" });
    }

    // Handle other errors
    console.error("Failed to register for the event:", error);
    return res.status(500).json({
      error: "Failed to register for the event",
      details: error.message
    });
  }
});


module.exports = router;
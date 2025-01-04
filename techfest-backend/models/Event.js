const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_id: { type: String, required: true, unique: true },
  event_name: { type: String, required: true },
  event_description: { type: String, required: true },
  event_image: { type: String, required: true },
  registered_users: [{ type: String }], // Array of phone numbers
});

module.exports = mongoose.model("Event", EventSchema);

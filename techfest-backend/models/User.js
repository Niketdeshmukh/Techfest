const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  enrollment: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("User", UserSchema);
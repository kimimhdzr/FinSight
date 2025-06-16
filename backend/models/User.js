const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  dob: String,
  bio: String,
});

module.exports = mongoose.model("User", UserSchema);

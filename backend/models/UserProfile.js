const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicUrl: { type: String },
  bannerPicUrl: { type: String },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  passwordHash: { type: String, required: true },
  dob: { type: Date },
  bio: { type: String },
  location: { type: String },
  monthlyIncome: { type: Number }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);

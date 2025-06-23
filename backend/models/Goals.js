const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user_ID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  goalName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  goalPicUrl: { type: String },
  goalAmount: { type: Number, required: true },
  completion: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', goalSchema);

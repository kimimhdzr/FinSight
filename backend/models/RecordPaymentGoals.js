const mongoose = require('mongoose');

const recordPaymentGoalSchema = new mongoose.Schema({
  goal_ID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Goal' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  desc: { type: String }
});

module.exports = mongoose.model('RecordPaymentGoal', recordPaymentGoalSchema);

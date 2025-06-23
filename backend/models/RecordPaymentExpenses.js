const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  type: String,
  category: String,
  amount: Number,
  description: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
});

module.exports = mongoose.model("PaymentExpense", PaymentSchema);

const Payment = require('../models/RecordPaymentExpenses');
//Create
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, user: req.user.id });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error saving to DB:', error);
    res.status(500).json({ error: error.message });
  }
};

//Get all
exports.getAllPayments = async (req, res) => {
  try {
    const userId = req.user.id; // from decoded JWT in middleware
    const payments = await Payment.find({ user: userId });;
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
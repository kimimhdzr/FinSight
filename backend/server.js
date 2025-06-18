const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Replace <username>, <password>, and <dbname> with your actual Atlas values
const uri = 'mongodb+srv://demo_user:321321@finsight.o9avqnu.mongodb.net/?retryWrites=true&w=majority&appName=FinSight';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PaymentSchema = new mongoose.Schema({
  type: String,
  category: String,
  amount: Number,
  description: String,
  date: String
});


const Payment = mongoose.model('Payment', PaymentSchema);

app.post('/api/payments', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error saving to DB:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
const express = require('express');
const cors = require('cors'); // ← Add this line
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const financialplannerRoutes = require('./routes/financialplanner');
const marketRoutes = require('./routes/market');
const paymentRoutes = require('./routes/payment');
// const userprofileRoutes = require('./routes/userProfile');

dotenv.config();

const app = express();
app.use(cors()); // ← Add this line to allow all origins
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/financial-planner', financialplannerRoutes);
app.use('/api/market', marketRoutes); //Market
app.use('/api', paymentRoutes);
// app.use('/api/userprofile', userprofileRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

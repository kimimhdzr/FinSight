require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const cors = require("cors");

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

client.connect().then(() => {
  try {
    db = client.db("user_db"); // your DB name
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});

// Get user by ID
app.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await db.collection("users").findOne({ userId: userId }).toO;
    console.log("Fetched transactions:", user); // Log full response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Update user profile
app.put("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedFields = { ...req.body };

    // ✅ If password present, hash it
    if (updatedFields.password) {
      const saltRounds = 13;
      updatedFields.password = await bcrypt.hash(
        updatedFields.password,
        saltRounds
      );
    }

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: userId },
        { $set: updatedFields },
        { returnDocument: "after" }
      );

    if (!result.value) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.value);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    // Validate: if parse failed, stop here
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    const transactions = await db
      .collection("transactions")
      .find({ userId: userId })
      .toArray();
    console.log("Fetched transactions:", transactions); // Log full response
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/goals", async (req, res) => {
  try {
    // Parse to number since DB stores it as Number
    const userId = parseInt(req.query.userId);

    // Validate: if parse failed, stop here
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    const goals = await db
      .collection("goals")
      .find({ userId: userId })
      .toArray();
    console.log("Fetched goals: ", goals);
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals: ", error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

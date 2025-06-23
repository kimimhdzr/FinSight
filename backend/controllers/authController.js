const UserProfile = require("../models/UserProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { firstName, lastName, phoneNumber, dob, email, password } = req.body;

  const existingUser = await UserProfile.findOne({ email });
  if (existingUser) {
    return res.status(400).json("Email already registered");
  }

  const hashed = await bcrypt.hash(password, 10);
  
  const newUser = new UserProfile({
    firstName: firstName || "", // Required
    lastName: lastName || "", // Required
    phoneNumber: phoneNumber || "",
    dob: dob || null,
    email: email || "", // Required
    passwordHash: hashed, // Required
    bio: "", // Optional, default empty
    location: "", // Optional, default empty
    monthlyIncome: 0, // Optional, default 0
    profilePicUrl: "", // Optional, default empty
    bannerPicUrl: "", // Optional, default empty
  });

  await newUser.save();
  res.status(201).json("User registered");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserProfile.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  // remove passwordHash before sending user info
  const { passwordHash, ...userData } = user._doc;

  res.json({ token, user: userData });
};

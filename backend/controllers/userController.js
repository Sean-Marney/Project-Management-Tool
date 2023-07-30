const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ user, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check credentials are correct
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ user, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get current user details
const getMe = async (req, res) => {
  // Get user details via middleware auth (applied in routes)
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({ id: _id, name, email });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };

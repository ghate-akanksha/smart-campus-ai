const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};



// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },

      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },

      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// ADMIN ONLY
exports.adminDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
};
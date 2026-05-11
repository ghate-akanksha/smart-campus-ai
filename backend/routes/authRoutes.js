const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");




// Public Routes
router.post("/register", registerUser);

router.post("/login", loginUser);




// Protected Route
router.get("/profile", protect, getProfile);




// Admin Route
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  adminDashboard
);

module.exports = router;
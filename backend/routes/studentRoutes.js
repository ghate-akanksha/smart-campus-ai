const express = require("express");

const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

// Create Student
router.post("/", createStudent);



// Get All Students
router.get("/", getAllStudents);



// Get Single Student
router.get("/:id", getSingleStudent);

// Logged In Student Profile
router.get(
  "/my-profile",
  protect,
  getMyProfile
);

// Update Student
router.put("/:id", updateStudent);



// Delete Student
router.delete("/:id", deleteStudent);



module.exports = router;
const express = require("express");

const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");



// Create Student
router.post("/", createStudent);



// Get All Students
router.get("/", getAllStudents);



// Get Single Student
router.get("/:id", getSingleStudent);



// Update Student
router.put("/:id", updateStudent);



// Delete Student
router.delete("/:id", deleteStudent);



module.exports = router;
const express = require("express");

const router = express.Router();

const {

  addAttendance,

  getAttendance,

  getStudentAttendance,

  updateAttendance,

  deleteAttendance

} = require(
  "../controllers/attendanceController"
);



// Add Attendance
router.post(
  "/",
  addAttendance
);



// Get All Attendance
router.get(
  "/",
  getAttendance
);



// Get Student Attendance
router.get(
  "/student/:email",
  getStudentAttendance
);



// Update Attendance
router.put(
  "/:id",
  updateAttendance
);



// Delete Attendance
router.delete(
  "/:id",
  deleteAttendance
);

module.exports = router;
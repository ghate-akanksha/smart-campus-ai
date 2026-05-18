const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");



// ======================================
// Config
// ======================================
dotenv.config();



// ======================================
// Database Connection
// ======================================
const connectDB = require("./config/db");

connectDB();



// ======================================
// Initialize Express App
// ======================================
const app = express();



// ======================================
// Middleware
// ======================================
app.use(cors());

app.use(express.json());



// ======================================
// Routes Import
// ======================================
const authRoutes =
require("./routes/authRoutes");

const studentRoutes =
require("./routes/studentRoutes");

const noticeRoutes =
require("./routes/noticeRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");



// ======================================
// API Routes
// ======================================

// Authentication
app.use(
  "/api/auth",
  authRoutes
);



// Students
app.use(
  "/api/students",
  studentRoutes
);



// Notices
app.use(
  "/api/notices",
  noticeRoutes
);



// Attendance
app.use(
  "/api/attendance",
  attendanceRoutes
);



// ======================================
// Test Route
// ======================================
app.get("/", (req, res) => {

  res.send(
    "Smart Campus AI Backend Running"
  );

});



// ======================================
// Server
// ======================================
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});
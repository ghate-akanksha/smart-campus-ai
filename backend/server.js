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
const connectDB =
  require("./config/db");

connectDB();



// ======================================
// Routes
// ======================================
const authRoutes =
  require("./routes/authRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

const noticeRoutes =
  require("./routes/noticeRoutes");



// ======================================
// App Initialization
// ======================================
const app = express();



// ======================================
// Middleware
// ======================================
app.use(cors());

app.use(express.json());



// ======================================
// API Routes
// ======================================

// Auth Routes
app.use(
  "/api/auth",
  authRoutes
);



// Student Routes
app.use(
  "/api/students",
  studentRoutes
);



// Notice Routes
app.use(
  "/api/notices",
  noticeRoutes
);



// ======================================
// Test Route
// ======================================
app.get("/", (req, res) => {

  res.send("API Running");

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
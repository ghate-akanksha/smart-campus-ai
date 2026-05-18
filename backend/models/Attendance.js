const mongoose = require("mongoose");



const attendanceSchema =
new mongoose.Schema({

  studentEmail: {
    type: String,
    required: true
  },

  studentName: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  attendanceDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  },

  markedBy: {
    type: String,
    required: true
  }

}, {

  timestamps: true
});



module.exports =
mongoose.model(
  "Attendance",
  attendanceSchema
);
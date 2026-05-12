const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);
const Attendance =
require("../models/Attendance");



// ===================================
// Add Attendance
// ===================================
exports.addAttendance =
async (req, res) => {

  try {

    const attendance =
    await Attendance.create(
      req.body
    );

    res.status(201).json({

      success: true,

      message:
      "Attendance Added Successfully",

      attendance
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};



// ===================================
// Get All Attendance
// ===================================
exports.getAttendance =
async (req, res) => {

  try {

    const attendance =
    await Attendance.find()
    .sort({
      attendanceDate: -1
    });

    res.status(200).json({

      success: true,

      attendance
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};



// ===================================
// Get Student Attendance
// ===================================
exports.getStudentAttendance =
async (req, res) => {

  try {

    const attendance =
    await Attendance.find({

      studentEmail:
      req.params.email

    });

    res.status(200).json({

      success: true,

      attendance
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};



// ===================================
// Update Attendance
// ===================================
exports.updateAttendance =
async (req, res) => {

  try {

    const attendance =
    await Attendance.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }
    );

    res.status(200).json({

      success: true,

      message:
      "Attendance Updated Successfully",

      attendance
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};



// ===================================
// Delete Attendance
// ===================================
exports.deleteAttendance =
async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
      "Attendance Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};
const Student = require("../models/studentModel");



// ============================
// Create Student
// ============================
const createStudent = async (req, res) => {

  try {

    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student Created Successfully",
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// Get All Students
// ============================
const getAllStudents = async (req, res) => {

  try {

    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// Get Single Student
// ============================
const getSingleStudent = async (req, res) => {

  try {

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// Update Student
// ============================
const updateStudent = async (req, res) => {

  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ============================
// Delete Student
// ============================
const deleteStudent = async (req, res) => {

  try {

    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ============================
// Get Logged In Student Profile
// ============================
const getMyProfile = async (req, res) => {

  try {

    const student = await Student.findOne({
      email: req.user.email,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
};
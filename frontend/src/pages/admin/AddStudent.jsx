import { useState } from "react";
import axios from "axios";

import "./AddStudent.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const AddStudent = () => {

  // Form State
  const [formData, setFormData] = useState({
    rollNumber: "",
    fullName: "",
    email: "",
    department: "",
    semester: "",
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  // Sidebar Menu
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
    },

    {
      name: "Students",
      path: "/admin/students",
    },

    {
      name: "Faculty",
      path: "/admin/faculty",
    },

    {
      name: "Attendance",
      path: "/admin/attendance",
    },

    {
      name: "Notices",
      path: "/admin/notices",
    },

    {
      name: "Timetable",
      path: "/admin/timetable",
    },
  ];

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // API Request
      const response = await axios.post(
        "http://localhost:5000/api/students",
        formData
      );

      console.log(response.data);

      alert("Student Added Successfully");

      // Clear Form
      setFormData({
        rollNumber: "",
        fullName: "",
        email: "",
        department: "",
        semester: "",
      });

      // Redirect Dashboard
      window.location.href = "/admin";

    } catch (error) {

      console.log(error);

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Failed To Add Student");

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="add-student-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Add Student" />

        {/* Form Container */}
        <div className="form-container">

          <h2>
            Add New Student
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Roll Number */}
            <input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />

            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Department */}
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            {/* Semester */}
            <input
              type="number"
              name="semester"
              placeholder="Enter Semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : "Add Student"}
            </button>

          </form>

        </div>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default AddStudent;
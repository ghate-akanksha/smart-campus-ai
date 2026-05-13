import { useEffect, useState } from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import "./EditStudent.css";

const EditStudent = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    rollNumber: "",
    semester: "",
    department: "",
  });




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
  ];




  // Fetch Student Data
  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );



        // IMPORTANT
        setStudent(res.data.student);

      } catch (error) {

        console.log(error);
      }
    };

    fetchStudent();

  }, [id]);




  // Handle Input Change
  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };




  // Update Student
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:5000/api/students/${id}`,
        student
      );

      alert(
        "Student Updated Successfully"
      );



      // Navigate Back
      navigate("/admin/students");

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };




  return (

    <div className="students-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Edit Student" />



        {/* Edit Form */}
        <div className="edit-student-container">

          <h2>
            Edit Student
          </h2>



          <form
            className="edit-student-form"
            onSubmit={handleUpdate}
          >

            <input
              type="text"
              name="fullName"
              placeholder="Student Name"
              value={student.fullName}
              onChange={handleChange}
              required
            />



            <input
              type="email"
              name="email"
              placeholder="Email"
              value={student.email}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={student.rollNumber}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={student.semester}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="department"
              placeholder="Department"
              value={student.department}
              onChange={handleChange}
              required
            />



            <button type="submit">
              Update Student
            </button>

          </form>

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default EditStudent;
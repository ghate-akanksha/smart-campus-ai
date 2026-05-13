import { useEffect, useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "./Students.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const Students = () => {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();



  // Sidebar Items
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



  // Fetch Students
  const fetchStudents = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data.students);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };



  useEffect(() => {

    fetchStudents();

  }, []);




  // Edit Student
  const handleEdit = (id) => {

    navigate(`/admin/edit-student/${id}`);
  };




  // Delete Student
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );



      // Remove Deleted Student From UI
      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student._id !== id
        )
      );



      alert("Student Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to delete student");
    }
  };




  return (

    <div className="students-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Student Management" />



        {/* Header */}
        <div className="student-header">

          <h2>
            All Students
          </h2>



          {/* Add Student Button */}
          <Link to="/admin/add-student">

            <button className="add-btn">
              Add Student
            </button>

          </Link>

        </div>



        {/* Students Table */}
        <div className="table-container">

          {loading ? (

            <p>Loading...</p>

          ) : students.length === 0 ? (

            <p>No Students Found</p>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Roll No</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Department</th>

                  <th>Semester</th>

                  <th>Actions</th>

                </tr>

              </thead>



              <tbody>

                {students.map((student) => (

                  <tr key={student._id}>

                    <td>
                      {student.rollNumber}
                    </td>

                    <td>
                      {student.fullName}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.department}
                    </td>

                    <td>
                      {student.semester}
                    </td>

                    <td>

                      {/* Edit Button */}
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(student._id)
                        }
                      >
                        Edit
                      </button>



                      {/* Delete Button */}
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(student._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default Students;
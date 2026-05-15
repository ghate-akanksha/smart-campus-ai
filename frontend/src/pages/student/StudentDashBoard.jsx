import "./StudentDashboard.css";

import {
  useEffect,
  useState,
} from "react";

import { Link }
from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const StudentDashboard = () => {

  // =====================================
  // States
  // =====================================
  const [student, setStudent] =
    useState(null);

  const [notices, setNotices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  // =====================================
  // Token
  // =====================================
  const token =
    localStorage.getItem("token");



  // =====================================
  // Sidebar Menu
  // =====================================
  const menuItems = [

    {
      name: "Dashboard",
      path: "/student",
    },

    {
      name: "Attendance",
      path: "/student/attendance",
    },

    {
      name: "Grades",
      path: "/student/grades",
    },

    {
      name: "Timetable",
      path: "/student/timetable",
    },

    {
      name: "Notices",
      path: "/student/notices",
    },

    {
      name: "Assignments",
      path: "/student/assignments",
    },

  ];




  // =====================================
  // Fetch Dashboard Data
  // =====================================
  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          setLoading(true);



          // =====================
          // Student Profile
          // =====================
          const profileRes =
            await axios.get(

              "http://localhost:5000/api/students/my-profile",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setStudent(
            profileRes.data.student
          );



          // =====================
          // Notices
          // =====================
          const noticeRes =
            await axios.get(
              "http://localhost:5000/api/notices/all"
            );

          setNotices(
            noticeRes.data.notices || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchDashboardData();

  }, [token]);




  // =====================================
  // Loading State
  // =====================================
  if (loading) {

    return (

      <div className="loading-box">

        <h2>
          Loading Dashboard...
        </h2>

      </div>
    );
  }




  return (

    <div className="student-dashboard">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Student Dashboard" />



        {/* =====================================
            Welcome Section
        ===================================== */}
        <div className="welcome-section">

          <h2>
            Welcome,
            {" "}
            {student?.fullName || "Student"}
          </h2>

          <p>
            Access attendance,
            grades, assignments,
            notices, and academic
            activities from one dashboard.
          </p>

        </div>




        {/* =====================================
            Dashboard Cards
        ===================================== */}
        <div className="cards">

          {/* Attendance */}
          <div className="card">

            <h3>
              Attendance
            </h3>

            <p>
              {student?.attendance || 0}%
            </p>

          </div>



          {/* GPA */}
          <div className="card">

            <h3>
              Current GPA
            </h3>

            <p>
              {student?.gpa || "N/A"}
            </p>

          </div>



          {/* Assignments */}
          <div className="card">

            <h3>
              Pending Assignments
            </h3>

            <p>
              {student?.assignments || 0}
            </p>

          </div>



          {/* Notices */}
          <Link
            to="/student/notices"
            className="card-link"
          >

            <div className="card">

              <h3>
                Latest Notices
              </h3>

              <p>
                {notices.length}
              </p>

            </div>

          </Link>

        </div>




        {/* =====================================
            Student Information
        ===================================== */}
        <div className="student-profile">

          <h2>
            Student Information
          </h2>



          <div className="student-info">

            <p>

              <strong>
                Email:
              </strong>

              {" "}

              {student?.email || "N/A"}

            </p>



            <p>

              <strong>
                Department:
              </strong>

              {" "}

              {student?.department || "N/A"}

            </p>



            <p>

              <strong>
                Semester:
              </strong>

              {" "}

              {student?.semester || "N/A"}

            </p>



            <p>

              <strong>
                Roll Number:
              </strong>

              {" "}

              {student?.rollNo || "N/A"}

            </p>

          </div>

        </div>




        {/* =====================================
            Notice Section
        ===================================== */}
        <div className="notice-section">

          <div className="notice-header">

            <h2>
              Latest Notices
            </h2>



            <Link to="/student/notices">

              <button className="view-btn">

                View All

              </button>

            </Link>

          </div>




          {
            notices.length > 0 ? (

              notices
                .slice(0, 3)
                .map((notice) => (

                  <div
                    className="notice-card"
                    key={notice._id}
                  >

                    <h3>
                      {notice.title}
                    </h3>

                    <p>
                      {notice.message}
                    </p>

                    <small>

                      Posted By:
                      {" "}

                      <strong>
                        {notice.postedBy}
                      </strong>

                    </small>

                  </div>

                ))

            ) : (

              <div className="empty-box">

                <p>
                  No Notices Available
                </p>

              </div>

            )
          }

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default StudentDashboard;
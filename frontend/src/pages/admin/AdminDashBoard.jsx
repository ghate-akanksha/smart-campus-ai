// AdminDashboard.jsx

import "./AdminDashboard.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const AdminDashboard = () => {

  // =====================================
  // User Data
  // =====================================
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const token =
    localStorage.getItem("token");



  // =====================================
  // Dashboard State
  // =====================================
  const [dashboardData, setDashboardData] =
    useState({

      students: 0,

      faculty: 0,

      departments: 12,

      notices: 0,

      pendingNotices: 0,

      attendance: 0,

    });

  const [loading, setLoading] =
    useState(true);




  // =====================================
  // Fetch Dashboard Data
  // =====================================
  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);



        // ===============================
        // Students
        // ===============================
        const studentsRes =
          await axios.get(
            "http://localhost:5000/api/students"
          );

        const studentCount =
          studentsRes.data.students
            ? studentsRes.data.students.length
            : studentsRes.data.length;



        // ===============================
        // Faculty
        // ===============================
        let facultyCount = 0;

        try {

          const facultyRes =
            await axios.get(
              "http://localhost:5000/api/faculty"
            );

          facultyCount =
            facultyRes.data.faculty
              ? facultyRes.data.faculty.length
              : facultyRes.data.length;

        } catch (err) {

          console.log(
            "Faculty API Error"
          );

        }



        // ===============================
        // Approved Notices
        // ===============================
        let noticeCount = 0;

        try {

          const noticesRes =
            await axios.get(
              "http://localhost:5000/api/notices/all"
            );

          noticeCount =
            noticesRes.data.notices
              ? noticesRes.data.notices.length
              : noticesRes.data.length;

        } catch (err) {

          console.log(
            "Notice API Error"
          );

        }



        // ===============================
        // Pending Notices
        // ===============================
        let pendingCount = 0;

        try {

          const pendingRes =
            await axios.get(

              "http://localhost:5000/api/notices/pending",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          pendingCount =
            pendingRes.data.notices
              ? pendingRes.data.notices.length
              : pendingRes.data.length;

        } catch (err) {

          console.log(
            "Pending Notice API Error"
          );

        }



        // ===============================
        // Attendance
        // ===============================
        let attendanceCount = 0;

        try {

          const attendanceRes =
            await axios.get(
              "http://localhost:5000/api/attendance"
            );

          attendanceCount =
            attendanceRes.data.attendance
              ? attendanceRes.data.attendance.length
              : attendanceRes.data.length;

        } catch (err) {

          console.log(
            "Attendance API Error"
          );

        }



        // ===============================
        // Update Dashboard
        // ===============================
        setDashboardData({

          students: studentCount,

          faculty: facultyCount,

          departments: 12,

          notices: noticeCount,

          pendingNotices:
            pendingCount,

          attendance:
            attendanceCount,

        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };




  // =====================================
  // Load Dashboard
  // =====================================
  useEffect(() => {

    fetchDashboardData();

  }, []);




  // =====================================
  // Sidebar Menu
  // =====================================
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
      path: "/attendance",
    },

    {
      name: "Add Attendance",
      path: "/add-attendance",
    },

    {
      name: "Manage Notices",
      path: "/admin/notices",
    },

    {
      name: "Notice Approval",
      path:
        "/admin/notice-approval",
    },

  ];




  return (

    <div className="admin-dashboard">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Admin Dashboard" />



        {/* =====================================
            Welcome Section
        ===================================== */}
        <div className="welcome-section">

          <h2>
            Welcome,
            {" "}
            {user?.fullName || "Admin"}
          </h2>

          <p>
            Manage students, faculty,
            attendance, notices,
            and campus activities
            from one dashboard.
          </p>

        </div>




        {/* =====================================
            Dashboard Cards
        ===================================== */}
        <div className="cards">

          {/* Students */}
          <Link
            to="/admin/students"
            className="card-link"
          >

            <div className="card">

              <h3>
                Total Students
              </h3>

              <p>
                {
                  loading
                    ? "..."
                    : dashboardData.students
                }
              </p>

            </div>

          </Link>



          {/* Faculty */}
          <div className="card">

            <h3>
              Total Faculty
            </h3>

            <p>
              {
                loading
                  ? "..."
                  : dashboardData.faculty
              }
            </p>

          </div>



          {/* Attendance */}
          <Link
            to="/attendance"
            className="card-link"
          >

            <div className="card">

              <h3>
                Attendance Records
              </h3>

              <p>
                {
                  loading
                    ? "..."
                    : dashboardData.attendance
                }
              </p>

            </div>

          </Link>



          {/* Departments */}
          <div className="card">

            <h3>
              Departments
            </h3>

            <p>
              {
                dashboardData.departments
              }
            </p>

          </div>



          {/* Notices */}
          <Link
            to="/admin/notices"
            className="card-link"
          >

            <div className="card">

              <h3>
                Total Notices
              </h3>

              <p>
                {
                  loading
                    ? "..."
                    : dashboardData.notices
                }
              </p>

            </div>

          </Link>



          {/* Pending Notices */}
          <Link
            to="/admin/notice-approval"
            className="card-link"
          >

            <div className="card">

              <h3>
                Pending Notices
              </h3>

              <p>
                {
                  loading
                    ? "..."
                    : dashboardData.pendingNotices
                }
              </p>

            </div>

          </Link>

        </div>




        {/* =====================================
            Attendance Management
        ===================================== */}
        <div className="notice-management">

          <h2>
            Attendance Management
          </h2>

          <p>
            Add, edit, delete,
            and manage student
            attendance records.
          </p>



          <div className="notice-buttons">

            <Link to="/attendance">

              <button className="notice-btn">

                View Attendance

              </button>

            </Link>



            <Link to="/add-attendance">

              <button className="notice-btn">

                Add Attendance

              </button>

            </Link>

          </div>

        </div>




        {/* =====================================
            Notice Management
        ===================================== */}
        <div className="notice-management">

          <h2>
            Notice Management
          </h2>

          <p>
            Create, approve,
            manage, and monitor
            all campus notices.
          </p>



          <div className="notice-buttons">

            <Link to="/admin/notices">

              <button className="notice-btn">

                Open Notices

              </button>

            </Link>



            <Link
              to="/admin/notice-approval"
            >

              <button className="notice-btn">

                Notice Approval

              </button>

            </Link>

          </div>

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default AdminDashboard;
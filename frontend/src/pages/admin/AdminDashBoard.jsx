import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const AdminDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Dashboard State
  const [dashboardData, setDashboardData] = useState({
    students: 0,
    faculty: 0,
    departments: 0,
    notices: 0,
  });

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {

    try {

      // API Calls
      const studentsRes = await axios.get(
        "http://localhost:5000/api/students"
      );

      // Optional APIs
      let facultyCount = 0;
      let noticeCount = 0;

      try {

        const facultyRes = await axios.get(
          "http://localhost:5000/api/faculty"
        );

        facultyCount = facultyRes.data.faculty
          ? facultyRes.data.faculty.length
          : facultyRes.data.length;

      } catch (err) {

        console.log("Faculty API not found");

      }

      try {

        const noticesRes = await axios.get(
          "http://localhost:5000/api/notices"
        );

        noticeCount = noticesRes.data.notices
          ? noticesRes.data.notices.length
          : noticesRes.data.length;

      } catch (err) {

        console.log("Notice API not found");

      }

      // Handle Different Backend Responses
      const studentCount =
        studentsRes.data.students
          ? studentsRes.data.students.length
          : studentsRes.data.length;

      // Update Dashboard
      setDashboardData({
        students: studentCount,
        faculty: facultyCount,
        departments: 12,
        notices: noticeCount,
      });

    } catch (error) {

      console.log(error);

    }
  };

  // Load Dashboard Data
  useEffect(() => {

    fetchDashboardData();

  }, []);

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

    {
      name: "Reports",
      path: "/admin/reports",
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

        {/* Dashboard Cards */}
        <div className="cards">

          {/* Students */}
          <Link
            to="/admin/students"
            className="card-link"
          >
            <div className="card">
              <h3>Total Students</h3>
              <p>{dashboardData.students}</p>
            </div>
          </Link>

          {/* Faculty */}
          <div className="card">
            <h3>Total Faculty</h3>
            <p>{dashboardData.faculty}</p>
          </div>

          {/* Departments */}
          <div className="card">
            <h3>Departments</h3>
            <p>{dashboardData.departments}</p>
          </div>

          {/* Notices */}
          <div className="card">
            <h3>New Notices</h3>
            <p>{dashboardData.notices}</p>
          </div>

        </div>

        {/* Welcome Section */}
        <div className="welcome-section">

          <h2>
            Welcome, {user?.fullName}
          </h2>

          <p>
            Welcome to Smart Campus AI
            Admin Panel. Manage students,
            faculty, notices, attendance,
            and campus activities here.
          </p>

        </div>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default AdminDashboard;
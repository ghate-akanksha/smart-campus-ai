import "./FacultyDashboard.css";

import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const FacultyDashboard = () => {

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

      classesToday: 5,

      assignments: 12,

      notices: 0,

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
        // Students Count
        // ===============================
        let studentCount = 0;

        try {

          const studentRes =
            await axios.get(
              "http://localhost:5000/api/students"
            );

          studentCount =
            studentRes.data.students
              ? studentRes.data.students.length
              : studentRes.data.length;

        } catch (err) {

          console.log(
            "Student API Error"
          );

        }



        // ===============================
        // Faculty Notices Count
        // ===============================
        let noticeCount = 0;

        try {

          const noticeRes =
            await axios.get(

              "http://localhost:5000/api/notices/all"

            );



          const allNotices =
            noticeRes.data.notices
              ? noticeRes.data.notices
              : noticeRes.data;



          // Faculty own notices only
          const myNotices =
            allNotices.filter(
              (notice) =>

                notice.postedBy ===
                user.fullName
            );



          noticeCount =
            myNotices.length;

        } catch (err) {

          console.log(
            "Notice API Error"
          );

        }



        // ===============================
        // Update Dashboard
        // ===============================
        setDashboardData({

          students: studentCount,

          classesToday: 5,

          assignments: 12,

          notices: noticeCount,

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
  // Sidebar Menu Items
  // =====================================
  const menuItems = [

    {
      name: "Dashboard",
      path: "/faculty",
    },

    {
      name: "Students",
      path: "/faculty/students",
    },

    {
      name: "Attendance",
      path: "/faculty/attendance",
    },

    {
      name: "Assignments",
      path: "/faculty/assignments",
    },

    {
      name: "Grades",
      path: "/faculty/grades",
    },

    {
      name: "Manage Notices",
      path: "/faculty/notices",
    },

    {
      name: "My Notices",
      path: "/faculty/my-notices",
    },

  ];




  return (

    <div className="faculty-dashboard">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Faculty Dashboard" />



        {/* =====================================
            Welcome Section
        ===================================== */}
        <div className="welcome-section">

          <h2>
            Welcome,
            {" "}
            {user?.fullName || "Faculty"}
          </h2>

          <p>
            Manage attendance,
            assignments, notices,
            and student activities
            from one dashboard.
          </p>

        </div>




        {/* =====================================
            Dashboard Cards
        ===================================== */}
        <div className="cards">

          {/* Students */}
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



          {/* Classes */}
          <div className="card">

            <h3>
              Classes Today
            </h3>

            <p>
              {
                dashboardData.classesToday
              }
            </p>

          </div>



          {/* Assignments */}
          <div className="card">

            <h3>
              Pending Assignments
            </h3>

            <p>
              {
                dashboardData.assignments
              }
            </p>

          </div>



          {/* My Notices */}
          <Link
            to="/faculty/notices"
            className="card-link"
          >

            <div className="card">

              <h3>
                My Notices
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

        </div>




        {/* =====================================
            Notice Management
        ===================================== */}
        <div className="notice-management">

          <h2>
            Notice Management
          </h2>

          <p>
            Create, manage,
            and monitor your
            faculty notices.
          </p>



          <div className="notice-buttons">

            {/* Open Notices */}
            <Link to="/faculty/notices">

              <button className="notice-btn">

                Open Notices

              </button>

            </Link>



            {/* Create Notice */}
            <Link to="/faculty/create-notice">

              <button className="notice-btn">

                Create Notice

              </button>

            </Link>



            {/* My Notices */}
            <Link to="/faculty/my-notices">

              <button className="notice-btn">

                My Notices

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

export default FacultyDashboard;
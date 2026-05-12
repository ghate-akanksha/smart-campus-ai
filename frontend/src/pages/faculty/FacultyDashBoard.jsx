import "./FacultyDashboard.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const FacultyDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  // Sidebar Menu Items
  const menuItems = [
    "Dashboard",
    "Students",
    "Attendance",
    "Assignments",
    "Grades",
    "Timetable",
    "Notices",
  ];



  return (

    <div className="faculty-dashboard">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Faculty Dashboard" />



        {/* Dashboard Cards */}
        <div className="cards">

          <div className="card">
            <h3>Total Students</h3>
            <p>320</p>
          </div>

          <div className="card">
            <h3>Classes Today</h3>
            <p>5</p>
          </div>

          <div className="card">
            <h3>Pending Assignments</h3>
            <p>12</p>
          </div>

          <div className="card">
            <h3>New Notices</h3>
            <p>4</p>
          </div>

        </div>



        {/* Welcome Section */}
        <div className="welcome-section">

          <h2>
            Welcome, {user?.fullName}
          </h2>

          <p>
            Welcome to Smart Campus AI
            Faculty Portal. Manage attendance,
            assignments, grades, notices,
            and student activities here.
          </p>

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default FacultyDashboard;
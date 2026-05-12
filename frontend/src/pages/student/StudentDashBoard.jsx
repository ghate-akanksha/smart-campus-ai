import "./StudentDashboard.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const StudentDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  // Sidebar Menu Items
  const menuItems = [
    "Dashboard",
    "Attendance",
    "Grades",
    "Timetable",
    "Notices",
    "Assignments",
  ];



  return (

    <div className="student-dashboard">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Student Dashboard" />



        {/* Cards */}
        <div className="cards">

          <div className="card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>

          <div className="card">
            <h3>Current GPA</h3>
            <p>8.7</p>
          </div>

          <div className="card">
            <h3>Pending Assignments</h3>
            <p>3</p>
          </div>

          <div className="card">
            <h3>New Notices</h3>
            <p>5</p>
          </div>

        </div>



        {/* Welcome Section */}
        <div className="welcome-section">

          <h2>
            Welcome, {user?.fullName}
          </h2>

          <p>
            Welcome to Smart Campus AI
            Student Portal.
          </p>

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default StudentDashboard;
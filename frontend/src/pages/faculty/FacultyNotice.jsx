// FacultyNotice.jsx

import "./FacultyNotice.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import CreateNotice
from "../../components/CreateNotice";

import NoticeList
from "../../components/NoticeList";

const FacultyNotice = () => {

  // ===================================
  // Sidebar Menu
  // ===================================
  const menuItems = [

    {
      name: "Dashboard",
      path: "/faculty",
    },

    {
      name: "Create Notice",
      path: "/faculty/create-notice",
    },

    {
      name: "My Notices",
      path: "/faculty/my-notices",
    },

    {
      name: "All Notices",
      path: "/faculty/notices",
    },

  ];




  return (

    <div className="faculty-notice-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* =====================================
          Main Content
      ===================================== */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Faculty Notice Management" />



        {/* =====================================
            Header
        ===================================== */}
        <div className="notice-header">

          <h2>
            Notice Management
          </h2>

          <p>
            Create and manage
            notices for students.
          </p>

        </div>




        {/* =====================================
            Create Notice
        ===================================== */}
        <CreateNotice />




        {/* =====================================
            Notice List
        ===================================== */}
        <div className="all-notices">

          <h2>
            All Notices
          </h2>

          <NoticeList />

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default FacultyNotice;
// FacultyMyNotices.jsx

import "./FacultyMyNotices.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const FacultyMyNotices = () => {

  // =====================================
  // State
  // =====================================
  const [notices, setNotices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  // =====================================
  // User & Token
  // =====================================
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const token =
    localStorage.getItem("token");



  // =====================================
  // Sidebar Menu
  // =====================================
  const menuItems = [

    {
      name: "Dashboard",
      path: "/teacher",
    },

    {
      name: "Create Notice",
      path: "/teacher/create-notice",
    },

    {
      name: "My Notices",
      path: "/teacher/my-notices",
    },

    {
      name: "Manage Notices",
      path: "/teacher/notices",
    },

  ];




  // =====================================
  // Fetch Faculty Notices
  // =====================================
  const fetchNotices =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(
            "http://localhost:5000/api/notices/all"
          );

        const allNotices =
          res.data.notices || [];



        // Faculty Notices Only
        const myNotices =
          allNotices.filter(

            (notice) =>

              notice.postedBy ===
              user.fullName

          );



        setNotices(myNotices);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to fetch notices"
        );

      } finally {

        setLoading(false);

      }
    };




  // =====================================
  // Delete Notice
  // =====================================
  const deleteNotice =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/notices/delete/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Notice Deleted"
        );

        fetchNotices();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Delete Failed"
        );

      }
    };




  // =====================================
  // Load Notices
  // =====================================
  useEffect(() => {

    fetchNotices();

  }, []);




  return (

    <div className="faculty-notice-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Faculty Notices" />



        {/* =====================================
            Header
        ===================================== */}
        <div className="notice-header">

          <h2>
            My Notices
          </h2>

          <p>
            View and manage
            all notices created by you.
          </p>

        </div>




        {/* =====================================
            Notice List
        ===================================== */}
        <div className="notice-container">

          {
            loading ? (

              <div className="loading-box">

                <h3>
                  Loading Notices...
                </h3>

              </div>

            ) : notices.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Notices Found
                </h3>

                <p>
                  You have not created
                  any notices yet.
                </p>

              </div>

            ) : (

              notices.map((notice) => (

                <div
                  className="notice-card"
                  key={notice._id}
                >

                  {/* Title */}
                  <h3>
                    {notice.title}
                  </h3>



                  {/* Message */}
                  <p>
                    {notice.message}
                  </p>



                  {/* Info */}
                  <div className="notice-info">

                    <small>

                      Posted By:
                      {" "}

                      <strong>
                        {notice.postedBy}
                      </strong>

                    </small>

                    <small>

                      Role:
                      {" "}

                      <strong>
                        {notice.role}
                      </strong>

                    </small>

                  </div>




                  {/* Delete Button */}
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteNotice(
                        notice._id
                      )
                    }
                  >

                    Delete Notice

                  </button>

                </div>

              ))
            )
          }

        </div>



        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default FacultyMyNotices;
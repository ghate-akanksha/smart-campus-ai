// AdminNoticeApproval.jsx

import "./AdminNoticeApproval.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const AdminNoticeApproval = () => {

  // =====================================
  // State
  // =====================================
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
      path: "/admin",
    },

    {
      name: "Students",
      path: "/admin/students",
    },

    {
      name: "Manage Notices",
      path: "/admin/notices",
    },

    {
      name: "Notice Approval",
      path: "/admin/notice-approval",
    },

  ];




  // =====================================
  // Fetch Pending Notices
  // =====================================
  const fetchNotices =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(

            "http://localhost:5000/api/notices/pending",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setNotices(
          res.data.notices || []
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to load notices"
        );

      } finally {

        setLoading(false);

      }
    };




  // =====================================
  // Approve Notice
  // =====================================
  const approveNotice =
    async (id) => {

      try {

        await axios.put(

          `http://localhost:5000/api/notices/approve/${id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Notice Approved"
        );

        fetchNotices();

      } catch (error) {

        console.log(error);

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

      }
    };




  // =====================================
  // Load Notices
  // =====================================
  useEffect(() => {

    fetchNotices();

  }, []);




  return (

    <div className="approval-page">

      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />



      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Notice Approval" />



        {/* Page Header */}
        <div className="approval-header">

          <h2>
            Pending Notices
          </h2>

          <p>
            Approve or reject
            faculty notices here.
          </p>

        </div>




        {/* Notices */}
        <div className="approval-container">

          {
            loading ? (

              <h3>
                Loading...
              </h3>

            ) : notices.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Pending Notices
                </h3>

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



                  {/* Posted By */}
                  <small>

                    Posted By:
                    {" "}

                    <strong>
                      {notice.postedBy}
                    </strong>

                  </small>

                  <br />



                  {/* Role */}
                  <small>

                    Role:
                    {" "}

                    <strong>
                      {notice.role}
                    </strong>

                  </small>




                  {/* Buttons */}
                  <div className="button-group">

                    {/* Approve */}
                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveNotice(
                          notice._id
                        )
                      }
                    >

                      Approve

                    </button>



                    {/* Delete */}
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteNotice(
                          notice._id
                        )
                      }
                    >

                      Delete

                    </button>

                  </div>

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

export default AdminNoticeApproval;
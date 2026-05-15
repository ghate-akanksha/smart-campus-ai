import "./NoticeList.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import NoticeCard
from "./NoticeCard";

const NoticeList = () => {

  const [notices, setNotices] =
    useState([]);




  // =========================
  // Fetch Notices
  // =========================
  const fetchNotices =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/notices/all"
          );

        setNotices(
          res.data.notices
        );

      } catch (error) {

        console.log(error);

      }
    };




  // =========================
  // Load Notices
  // =========================
  useEffect(() => {

    fetchNotices();

  }, []);




  return (

    <div className="noticeList">

      <h2>
        All Notices
      </h2>



      {
        notices.length === 0 ? (

          <div className="noNotice">

            No Notices Available

          </div>

        ) : (

          notices.map(
            (notice) => (

              <NoticeCard
                key={
                  notice._id
                }

                notice={
                  notice
                }

                fetchNotices={
                  fetchNotices
                }
              />
            )
          )

        )
      }

    </div>
  );
};

export default NoticeList;
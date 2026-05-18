import "./NoticeCard.css";
import axios from "axios";

const NoticeCard = ({
  notice,
  fetchNotices,
}) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const deleteNotice =
    async () => {

      try {

        await axios.delete(
          `http://localhost:5000/api/notices/delete/${notice._id}`
        );

        alert(
          "Notice Deleted"
        );

        fetchNotices();

      } catch (error) {

        console.log(error);

      }
    };



  // Admin can delete all
  // Faculty only own notices
  const canDelete =

    user.role === "admin"

    ||

    (
      user.role ===
        "teacher"

      &&

      user.fullName ===
        notice.postedBy
    );



  return (

    <div className="noticeCard">

      <h3>
        {notice.title}
      </h3>

      <p>
        {notice.message}
      </p>

      <small>

        Posted By:
        {" "}
        {notice.postedBy}

      </small>

      <br />

      <small>
        Role:
        {" "}
        {notice.role}
      </small>

      <br />



      {
        canDelete && (

          <button
            onClick={
              deleteNotice
            }
          >

            Delete

          </button>
        )
      }

    </div>
  );
};

export default NoticeCard;
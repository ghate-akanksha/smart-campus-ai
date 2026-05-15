import "./CreateNotice.css";
import { useState }
from "react";

import axios from "axios";

const CreateNotice = () => {

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");



  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/notices/create",

          {
            title,
            message,
            postedBy:
              user.fullName,

            role:
              user.role,
          }
        );

        alert(
          "Notice Created"
        );

        setTitle("");

        setMessage("");

        window.location.reload();

      } catch (error) {

        console.log(error);

      }
    };



  // Students cannot create
  if (
    user.role === "student"
  ) {
    return null;
  }



  return (

    <div className="createBox">

      <h2>
        Create Notice
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          required
        />



        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          required
        />



        <button type="submit">

          Create

        </button>

      </form>

    </div>
  );
};

export default CreateNotice;
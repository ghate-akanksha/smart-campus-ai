import "./Attendance.css";

import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {

  // =====================================
  // State
  // =====================================
  const [attendance, setAttendance] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    subject: "",
    attendanceDate: "",
    status: "Present",
    markedBy: ""
  });



  // =====================================
  // Fetch Attendance
  // =====================================
  const fetchAttendance = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/attendance"
      );

      setAttendance(res.data.attendance);

    } catch (error) {

      console.log(error);

    }
  };



  // =====================================
  // Load Data
  // =====================================
  useEffect(() => {

    fetchAttendance();

  }, []);




  // =====================================
  // Handle Input Change
  // =====================================
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });
  };




  // =====================================
  // Add Attendance
  // =====================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/attendance",
        formData
      );

      alert("Attendance Added");

      fetchAttendance();

      setFormData({
        studentName: "",
        studentEmail: "",
        subject: "",
        attendanceDate: "",
        status: "Present",
        markedBy: ""
      });

    } catch (error) {

      console.log(error);

      alert("Error Adding Attendance");
    }
  };




  // =====================================
  // Delete Attendance
  // =====================================
  const deleteAttendance = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/attendance/${id}`
      );

      alert("Attendance Deleted");

      fetchAttendance();

    } catch (error) {

      console.log(error);

    }
  };




  return (

    <div className="attendance-container">

      <h2>Attendance Management</h2>



      {/* ============================= */}
      {/* Attendance Form */}
      {/* ============================= */}

      <form
        className="attendance-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />



        <input
          type="email"
          name="studentEmail"
          placeholder="Student Email"
          value={formData.studentEmail}
          onChange={handleChange}
          required
        />



        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />



        <input
          type="date"
          name="attendanceDate"
          value={formData.attendanceDate}
          onChange={handleChange}
          required
        />



        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>

        </select>



        <input
          type="text"
          name="markedBy"
          placeholder="Marked By"
          value={formData.markedBy}
          onChange={handleChange}
          required
        />



        <button type="submit">
          Add Attendance
        </button>

      </form>




      {/* ============================= */}
      {/* Attendance Table */}
      {/* ============================= */}

      <table>

        <thead>

          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Marked By</th>
            <th>Action</th>

          </tr>

        </thead>



        <tbody>

          {
            attendance.map((item) => (

              <tr key={item._id}>

                <td>{item.studentName}</td>

                <td>{item.studentEmail}</td>

                <td>{item.subject}</td>

                <td>
                  {
                    new Date(
                      item.attendanceDate
                    ).toLocaleDateString()
                  }
                </td>

                <td>{item.status}</td>

                <td>{item.markedBy}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAttendance(item._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
};

export default Attendance;
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");



  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  // Handle Register
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );



      setSuccess(
        response.data.message
      );



      // Redirect To Login
      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };



  return (

    <div className="register-container">

      <div className="register-card">

        <h2 className="register-title">
          Smart Campus Register
        </h2>



        {/* Success Message */}
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}



        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}



        <form onSubmit={handleSubmit}>


          {/* Full Name */}
          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

          </div>



          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>



          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>



          {/* Role */}
          <div className="form-group">

            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="register-btn"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Login Link */}
        <p className="login-link">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;
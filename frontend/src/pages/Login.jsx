import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  // Handle Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );



      // Save Token
      localStorage.setItem(
        "token",
        response.data.token
      );



      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );



      alert("Login Successful");



      // Role Based Redirect
      const role = response.data.user.role;

      if (role === "admin") {

        navigate("/admin");

      } else if (role === "teacher") {

        navigate("/faculty");

      } else {

        navigate("/student");

      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };
  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">
          Smart Campus Login
        </h2>
        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
        {/* Register Link */}
        <p className="register-link">

          Don&apos;t have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  // Not Logged In
  if (!token) {
    return <Navigate to="/login" />;
  }



  // Role Check
  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }



  return children;
};

export default ProtectedRoute;
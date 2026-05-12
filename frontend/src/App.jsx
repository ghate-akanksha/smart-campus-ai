import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



// Auth Pages
import Register from "./pages/Register";
import Login from "./pages/Login";



// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/admin/Students";



// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";

import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AddStudent from "./pages/admin/AddStudent";



function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />



        {/* Public Routes */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />



        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />



        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">

              <StudentDashboard />

            </ProtectedRoute>
          }
        />



        {/* Faculty Dashboard */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">

              <FacultyDashboard />

            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/students"
  element={
    <ProtectedRoute role="admin">
      <Students />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/students"
  element={
    <ProtectedRoute role="admin">
      <Students />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/add-student"
  element={
    <ProtectedRoute role="admin">
      <AddStudent />
    </ProtectedRoute>
  }
/>

        {/* Invalid Route */}
        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
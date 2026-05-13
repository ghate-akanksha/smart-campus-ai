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



// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";



// Student Dashboard
import StudentDashboard from "./pages/student/StudentDashboard";



// Faculty Dashboard
import FacultyDashboard from "./pages/faculty/FacultyDashboard";



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



        {/* ================= ADMIN ROUTES ================= */}

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />



        {/* Students Page */}
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">

              <Students />

            </ProtectedRoute>
          }
        />



        {/* Add Student */}
        <Route
          path="/admin/add-student"
          element={
            <ProtectedRoute role="admin">

              <AddStudent />

            </ProtectedRoute>
          }
        />



        {/* Edit Student */}
        <Route
          path="/admin/edit-student/:id"
          element={
            <ProtectedRoute role="admin">

              <EditStudent />

            </ProtectedRoute>
          }
        />



        {/* ================= STUDENT ROUTES ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">

              <StudentDashboard />

            </ProtectedRoute>
          }
        />



        {/* ================= FACULTY ROUTES ================= */}

        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">

              <FacultyDashboard />

            </ProtectedRoute>
          }
        />



        {/* 404 Route */}
        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />



      </Routes>

    </BrowserRouter>
  );
}

export default App;
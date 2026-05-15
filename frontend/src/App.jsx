import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



// ========================================
// AUTH PAGES
// ========================================
import Register from "./pages/Register";
import Login from "./pages/Login";



// ========================================
// NOTICE PAGE
// ========================================
import NoticePage
from "./pages/NoticePage";



// ========================================
// PROTECTED ROUTE
// ========================================
import ProtectedRoute
from "./components/ProtectedRoute";



// ========================================
// ADMIN PAGES
// ========================================
import AdminDashboard
from "./pages/admin/AdminDashboard";

import Students
from "./pages/admin/Students";

import AddStudent
from "./pages/admin/AddStudent";

import EditStudent
from "./pages/admin/EditStudent";

import AdminNoticeApproval
from "./pages/admin/AdminNoticeApproval";



// ========================================
// STUDENT PAGES
// ========================================
import StudentDashboard
from "./pages/student/StudentDashboard";



// ========================================
// FACULTY PAGES
// ========================================
import FacultyDashboard
from "./pages/faculty/FacultyDashboard";

import FacultyNotice
from "./pages/faculty/FacultyNotice";

import FacultyMyNotices
from "./pages/faculty/FacultyMyNotices";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ========================================
            DEFAULT ROUTE
        ======================================== */}
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />



        {/* ========================================
            PUBLIC ROUTES
        ======================================== */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />



        {/* ========================================
            ADMIN ROUTES
        ======================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
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



        <Route
          path="/admin/edit-student/:id"
          element={
            <ProtectedRoute role="admin">
              <EditStudent />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/notice-approval"
          element={
            <ProtectedRoute role="admin">
              <AdminNoticeApproval />
            </ProtectedRoute>
          }
        />



        {/* ========================================
            ADMIN NOTICE PAGE
        ======================================== */}

        <Route
          path="/admin/notices"
          element={
            <ProtectedRoute role="admin">
              <NoticePage />
            </ProtectedRoute>
          }
        />



        {/* ========================================
            STUDENT ROUTES
        ======================================== */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/student/notices"
          element={
            <ProtectedRoute role="student">
              <NoticePage />
            </ProtectedRoute>
          }
        />



        {/* ========================================
            FACULTY ROUTES
        ======================================== */}

        <Route
          path="/faculty"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/faculty/create-notice"
          element={
            <ProtectedRoute role="faculty">
              <FacultyNotice />
            </ProtectedRoute>
          }
        />



        <Route
          path="/faculty/my-notices"
          element={
            <ProtectedRoute role="faculty">
              <FacultyMyNotices />
            </ProtectedRoute>
          }
        />



        <Route
          path="/faculty/notices"
          element={
            <ProtectedRoute role="faculty">
              <NoticePage />
            </ProtectedRoute>
          }
        />



        {/* ========================================
            404 PAGE
        ======================================== */}

        <Route
          path="*"
          element={
            <h1>
              404 Page Not Found
            </h1>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
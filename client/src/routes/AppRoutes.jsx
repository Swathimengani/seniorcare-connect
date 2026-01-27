import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import UserDashboard from "../pages/UserDashboard";
import CaregiverDashboard from "../pages/CaregiverDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import BookService from "../pages/BookService";
import MyBookings from "../pages/MyBookings";

import ProtectedRoute from "../components/ProtectedRoute";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User dashboard */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Caregiver dashboard */}
      <Route
        path="/caregiver/dashboard"
        element={
          <ProtectedRoute allowedRoles={["CAREGIVER"]}>
            <CaregiverDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/book"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <BookService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/bookings"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

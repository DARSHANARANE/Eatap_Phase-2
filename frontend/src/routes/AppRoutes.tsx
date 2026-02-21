import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";

// --------------------
// Admin Pages
// --------------------
import Dashboard from "../pages/admin/Dashboard";
import MessOwnersList from "../pages/admin/messOwners/MessOwnersList";
import MessDetails from "../pages/admin/messOwners/MessDetails";
import StudentsList from "../pages/admin/students/StudentsList";
import StudentDetails from "../pages/admin/students/StudentDetails";
import Settings from "../pages/admin/Settings";

// --------------------
// Owner Pages
// --------------------
import OwnerDashboard from "../pages/owner/Dashboard";
import MenuManagement from "../pages/owner/menu/MenuManagement";
import OwnerProfile from "../pages/owner/OwnerProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<LoginPage />} />

      {/* ================= ADMIN FLOW ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect → /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        {/* Mess Owners */}
        <Route path="mess-owners" element={<MessOwnersList />} />
        <Route path="mess/:id" element={<MessDetails />} />

        {/* Students */}
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:id" element={<StudentDetails />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= OWNER FLOW ================= */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="profile" element={<OwnerProfile />} />
          <Route path="menu" element={<MenuManagement />} />
          {/* <Route path="orders" element={<Orders />} /> */}
          <Route path="settings" element={<Settings />} />
        </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
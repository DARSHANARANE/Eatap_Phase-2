import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import MessOwnersList from "../pages/admin/messOwners/MessOwnersList";
import MessDetails from "../pages/admin/messOwners/MessDetails";
import StudentsList from "../pages/admin/students/StudentsList";
import StudentDetails from "../pages/admin/students/StudentDetails";
import Settings from "../pages/admin/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* ADMIN FLOW */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Mess Owners */}
        <Route path="mess-owners" element={<MessOwnersList />} />
        <Route path="/admin/mess/:id" element={<MessDetails />} />


        {/* Students */}
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:id" element={<StudentDetails />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

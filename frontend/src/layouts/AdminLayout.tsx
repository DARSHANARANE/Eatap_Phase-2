// frontend/src/layouts/AdminLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/admin")} className="text-left hover:opacity-80">
            Dashboard
          </button>
          <button onClick={() => navigate("/admin/users")} className="text-left hover:opacity-80">
            Users
          </button>
          <button onClick={() => navigate("/admin/settings")} className="text-left hover:opacity-80">
            Settings
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

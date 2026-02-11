import { Outlet, NavLink } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 text-xl font-bold text-purple-600">
          Mess Owner
        </div>

        <nav className="px-4 space-y-2">
          <NavLink
            to="/owner"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-purple-100 ${isActive ? "bg-purple-100 font-semibold" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/owner/students"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-purple-100 ${isActive ? "bg-purple-100 font-semibold" : ""}`
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/owner/menu/menumanagement"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-purple-100 ${isActive ? "bg-purple-100 font-semibold" : ""}`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/owner/menu"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-purple-100 ${isActive ? "bg-purple-100 font-semibold" : ""}`
            }
          >
            Earnings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;

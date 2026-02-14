// frontend/src/layouts/AdminLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  UserCog,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // ✅ only for desktop

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Mess Owners", path: "/admin/mess-owners", icon: UserCog, count: 3 },
    { label: "Users", path: "/admin/students", icon: Users, count: 1 },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Title */}
      <div className="pt-8 pb-5 text-center">
        {!collapsed ? (
          <>
            <h2 className="text-lg font-bold tracking-[2px] uppercase">
              Eatap
            </h2>
            <p className="text-xs text-white/70 mt-1">Admin Panel</p>
          </>
        ) : (
          <h2 className="text-xl font-bold text-white">E</h2>
        )}
      </div>

      {/* Menu */}
      <nav className="px-4 mt-2 flex flex-col gap-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`relative w-full flex items-center rounded-full transition-all duration-300 cursor-pointer
                // ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3 "}
                ${
                  isActive
                    ? "bg-white/90 text-[#340D5D] shadow-md"
                    : "text-white/90 hover:bg-white/10 hover:translate-x-1"
                }`}
            >
              {/* Active Indicator show only on desktop expanded */}
              {/* {isActive && !collapsed && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 w-[6px] h-[22px] rounded-full bg-[#A855F7]" />
              )} */}

              <Icon
                size={20}
                className={isActive ? "text-[#340D5D]" : "text-white"}
              />

              {!collapsed && (
                <span className="text-sm font-semibold flex-1 text-left">
                  {item.label}
                </span>
              )}

              {!collapsed && typeof item.count === "number" && (
                <span
                  className={`text-xs px-2 py-[2px] rounded-full font-bold
                    ${
                      isActive
                        ? "bg-white text-[#340D5D]"
                        : "bg-white/20 text-white"
                    }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            handleLogout();
            setMobileOpen(false);
          }}
          className={`mt-4 w-full flex items-center rounded-full transition-all duration-300 text-white/90 cursor-pointer
            ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"}
            hover:bg-red-500/20 hover:translate-x-1`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </nav>

      {/* Bottom Decoration */}
      <div className="relative w-full h-24">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white/10 rounded-t-[50px]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ MOBILE TOP BAR (NO collapse button) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-gradient-to-b from-[#440F7B] to-[#340D5D] text-white hover:opacity-90 transition"
        >
          <Menu size={22} className="text-white" />
        </button>

        <h1 className="font-bold text-gray-800">Admin Panel</h1>

        {/* spacer */}
        <div className="w-10" />
      </div>

      {/* ✅ DESKTOP SIDEBAR (collapse only here) */}
      <aside
        className={`hidden lg:block bg-gradient-to-b from-[#440F7B] to-[#340D5D] text-white relative overflow-hidden shadow-xl transition-all duration-300
        ${collapsed ? "w-[90px]" : "w-[280px]"}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 right-4 z-50 p-2 rounded-full bg-white/15 hover:bg-white/25 transition cursor-pointer"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-white" />
          ) : (
            <ChevronLeft size={20} className="text-white" />
          )}
        </button>

        <SidebarContent />
      </aside>

      {/* ✅ MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ✅ MOBILE SIDEBAR (always full width, no collapse button) */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 bg-gradient-to-b from-[#440F7B] to-[#340D5D] text-white shadow-xl transition-all duration-300
        w-[270px]
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10"
        >
          <X size={20} className="text-white" />
        </button>

        {/* ✅ Mobile should always be expanded → force collapsed false */}
        <div className="pt-8">
          <SidebarContent />
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 pt-16 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

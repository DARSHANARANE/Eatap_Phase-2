import DashboardLayout from "./DashboardLayout";
import {
  LayoutDashboard,
  Users,
  Settings,
  UserCog,
} from "lucide-react";

const AdminLayout = () => {
  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Mess Owners", path: "/admin/mess-owners", icon: UserCog },
    { label: "Users", path: "/admin/students", icon: Users },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return <DashboardLayout title="Admin Panel" menu={menu} />;
};

export default AdminLayout;
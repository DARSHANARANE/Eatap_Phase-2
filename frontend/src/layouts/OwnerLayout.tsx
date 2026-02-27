import DashboardLayout from "./DashboardLayout";
import {
  LayoutDashboard,
  Settings,
  UtensilsCrossed,
  ClipboardList,
  User
} from "lucide-react";

const OwnerLayout = () => {
  const menu = [
    { label: "Dashboard", path: "/owner/dashboard", icon: LayoutDashboard },
    { label: "Profile", path: "/owner/profile", icon: User }, // ✅ Added
    { label: "Today's Menu", path: "/owner/todays-menu", icon: UtensilsCrossed },
    { label: "Menu Management", path: "/owner/menu", icon: UtensilsCrossed },
    { label: "Orders", path: "/owner/orders", icon: ClipboardList },
    { label: "Settings", path: "/owner/settings", icon: Settings },
  ];

  return <DashboardLayout title="Mess Owner Panel" menu={menu} />;
};

export default OwnerLayout;
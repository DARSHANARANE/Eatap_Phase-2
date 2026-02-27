import DashboardTemplate from "../../components/dashboard/DashboardTemplate";
import { Users, UserCog, Store, UserPlus } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Mess Owners",
      value: 42,
      icon: UserCog,
      cardBg: "bg-blue-500",
    },
    {
      title: "Total Students",
      value: 1280,
      icon: Users,
      cardBg: "bg-green-500",
    },
    {
      title: "Active Messes",
      value: 36,
      icon: Store,
      cardBg: "bg-purple-500",
    },
    {
      title: "Today's Registrations",
      value: 18,
      icon: UserPlus,
      cardBg: "bg-orange-500",
    },
  ];

  const quickActions = [
    {
      label: "View Mess Owners",
      to: "/admin/mess-owners",
      colorFrom: "from-blue-50",
      colorTo: "to-blue-100 hover:to-blue-300",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600",
    },
    {
      label: "View Students",
      to: "/admin/students",
      colorFrom: "from-green-50",
      colorTo: "to-green-100 hover:to-green-300",
      textColor: "text-green-700",
      buttonColor: "bg-green-600",
    },
  ];

  return (
    <DashboardTemplate
      title="Dashboard"
      subtitle="Welcome back, Admin!"
      stats={stats}
      quickActions={quickActions}
    />
  );
};

export default AdminDashboard;
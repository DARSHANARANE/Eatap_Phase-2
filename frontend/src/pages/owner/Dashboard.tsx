import DashboardTemplate from "../../components/dashboard/DashboardTemplate";
import { Users, Store } from "lucide-react";

import { useOwner } from "../../hooks/useOwner";
import { Navigate } from "react-router-dom";
const OwnerDashboard = () => {
    const { owner, loading } = useOwner();

  // ⏳ Wait for API
  if (loading) return <p>Loading...</p>;

  // 🚨 Auto redirect if no mess profile
  if (!owner?._id) {
    return <Navigate to="/owner/profile" replace />;
  }
  const stats = [
    {
      title: "Total Students",
      value: 210,
      icon: Users,
      cardBg: "bg-green-500",
    },
    {
      title: "Active Menu Items",
      value: 32,
      icon: Store,
      cardBg: "bg-purple-500",
    },
  ];

  const quickActions = [
    {
      label: "Manage Menu",
      to: "/owner/menu",
      colorFrom: "from-purple-50",
      colorTo: "to-purple-100 hover:to-purple-300",
      textColor: "text-purple-700",
      buttonColor: "bg-purple-600",
    },
    {
      label: "View Students",
      to: "/owner/students",
      colorFrom: "from-green-50",
      colorTo: "to-green-100 hover:to-green-300",
      textColor: "text-green-700",
      buttonColor: "bg-green-600",
    },
  ];

  return (
    <DashboardTemplate
      title="Dashboard"
      subtitle="Welcome back, Mess Owner!"
      stats={stats}
      quickActions={quickActions}
    />
  );
};

export default OwnerDashboard;
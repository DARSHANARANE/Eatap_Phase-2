import DashboardCard from "../../components/dashboard/DashboardCard";
// import MenuManagement from "../owner/MenuManagement";
// import { useOwner } from "@/hooks/useOwner";

const OwnerDashboard = () => {
return (
    <div className="space-y-6">

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard title="Students" value="45" color="blue" />
        <DashboardCard title="Today Menu" value="Available" color="green" />
        <DashboardCard title="Monthly Earnings" value="₹32,000" color="purple" />
        <DashboardCard title="Pending Requests" value="3" color="red" />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Today Menu */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Today’s Menu 🍽️</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✔ Rice</li>
            <li>✔ Dal</li>
            <li>✔ Sabji</li>
            <li>✔ Roti</li>
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Notifications 🔔</h2>
          <p className="text-sm text-gray-600">
            2 new student requests pending approval
          </p>
        </div>
      </div>

    </div>
  );
};

export default OwnerDashboard;



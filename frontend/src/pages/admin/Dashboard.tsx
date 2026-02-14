import { Link } from "react-router-dom";
import TopNav from "../../layouts/TopNav";

import { Users, UserCog, Store, UserPlus, ArrowRight } from "lucide-react";

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

const Dashboard = () => {
  return (
    <div>
      {/* Top Navbar */}
      <TopNav
      title="Dashboard"
      subtitle="Welcome back, Admin!"
      showIcons
    />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        
        {stats.map((item, index) => {
        const Icon = item.icon;

      return (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md transition flex items-center justify-between"
        >
          {/* Left text */}
          <div>
            <h1 className="text-sm  text-gray-500 font-medium">{item.title}</h1>
            <p className="text-3xl font-bold text-gray-800 mt-2">{item.value}</p>
          </div>

          {/* Right icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.cardBg}`}
          >
            <Icon size={25} className="text-white" />
          </div>
        </div>
      );
      })}
    </div>


      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Mess Owners */}
          <Link
            to="/admin/mess-owners"
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 
              hover:from-blue-100 hover:to-blue-300
              p-6 rounded-2xl transition-all duration-300 
              shadow-sm hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-blue-700">
                View Mess Owners
              </span>

              <div className="bg-blue-600 text-white p-3 rounded-xl 
                group-hover:scale-110 transition">
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>

          {/* Students */}
          <Link
            to="/admin/students"
            className="group relative bg-gradient-to-br from-green-50 to-green-100 
              hover:from-green-100 hover:to-green-300
              p-6 rounded-2xl transition-all duration-300 
              shadow-sm hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-green-700">
                View Students
              </span>

              <div className="bg-green-600 text-white p-3 rounded-xl 
                group-hover:scale-110 transition">
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;

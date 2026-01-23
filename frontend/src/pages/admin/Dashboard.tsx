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
      <TopNav />

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
      <div className="bg-white rounded-xl shadow-sm p-6 ">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 p-8 gap-6">
          {/* mess owners */}
          <Link
            to="/admin/mess-owners"
            className=" flex items-center justify-start gap-2 shadow-md text-center bg-blue-500 p-10 rounded-2xl transition-all hover:bg-blue-300 text-white hover:text-gray-800"
          >
            View Mess Owners <ArrowRight size={22} />
          </Link>
          {/* students */}
          <Link
            to="/admin/students"
            className="flex items-center justify-start gap-2 p-5 shadow-md text-center bg-green-700 py-3 rounded-2xl hover:bg-green-300 text-white transition hover:text-gray-800"
          >
            View Students <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Mess Owners",
    value: 42,
  },
  {
    title: "Total Students",
    value: 1280,
  },
  {
    title: "Active Messes",
    value: 36,
  },
  {
    title: "Today's Registrations",
    value: 18,
  },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition"
          >
            <h2 className="text-sm text-gray-500">{item.title}</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/admin/mess-owners"
            className="flex-1 text-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            View Mess Owners
          </Link>

          <Link
            to="/admin/students"
            className="flex-1 text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            View Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { LogOut, Bell } from "lucide-react";

const TopNav = () => {
  const notificationCount = 3;

  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Right side icons */}
      <div className="flex items-center gap-10">
        
        {/* Bell with badge */}
        <button className="relative p-1 hover:bg-gradient-to-b from-[#440F7B] to-[#340D5D] rounded-full transition cursor-pointer">
          <Bell size={24} className="text-gray-600" />
            {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
        
        {/* Logout */}
        <button className="p-3 ">
          <LogOut size={24} className="text-gray-600 hover:text-red-600 transition cursor-pointer" />
        </button>

      </div>
    </div>
  );
};

export default TopNav;

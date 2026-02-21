import { LogOut, Bell, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
  title: string;
  subtitle?: string;
  showIcons?: boolean;
  showBackButton?: boolean;
}

const TopNav = ({
  title,
  subtitle,
  showIcons = false,
  showBackButton = false,
}: TopNavProps) => {
  const navigate = useNavigate();
  const notificationCount = 3;

  return (
    <div className="flex items-center justify-between mb-3 bg-white p-4 rounded-xl shadow-md">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center bg-indigo-900 text-white rounded-full p-2 shadow-md hover:bg-indigo-600 transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

      </div>

      {/* Right Section */}
      {showIcons && (
        <div className="flex items-center gap-6">
          
          {/* Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Bell size={22} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <LogOut
              size={22}
              className="text-gray-600 hover:text-red-600 transition"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNav;

import { Link } from "react-router-dom";
import TopNav from "../../layouts/TopNav";
import { ArrowRight } from "lucide-react";

interface StatItem {
  title: string;
  value: number | string;
  icon: any;
  cardBg: string;
}

interface QuickAction {
  label: string;
  to: string;
  colorFrom: string;
  colorTo: string;
  textColor: string;
  buttonColor: string;
}

interface DashboardTemplateProps {
  title: string;
  subtitle: string;
  stats: StatItem[];
  quickActions: QuickAction[];
}

const DashboardTemplate = ({
  title,
  subtitle,
  stats,
  quickActions,
}: DashboardTemplateProps) => {
  return (
    <div>
      {/* Top Navbar */}
      <TopNav title={title} subtitle={subtitle} showIcons />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md transition flex items-center justify-between"
            >
              <div>
                <h1 className="text-sm text-gray-500 font-medium">
                  {item.title}
                </h1>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {item.value}
                </p>
              </div>

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
      {quickActions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.to}
                className={`group relative bg-gradient-to-br ${action.colorFrom} ${action.colorTo}
                  hover:shadow-lg hover:-translate-y-1
                  p-6 rounded-2xl transition-all duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-base font-semibold ${action.textColor}`}
                  >
                    {action.label}
                  </span>

                  <div
                    className={`${action.buttonColor} text-white p-3 rounded-xl 
                    group-hover:scale-110 transition`}
                  >
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTemplate;
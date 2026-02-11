interface DashboardCardProps {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "purple" | "red";
}

const DashboardCard = ({
  title,
  value,
  color = "blue",
}: DashboardCardProps) => {
  const colors = {
    blue: "text-blue-700 bg-blue-100",
    green: "text-green-700 bg-green-100",
    purple: "text-purple-700 bg-purple-100",
    red: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>

      <div
        className={`mt-2 inline-block px-3 py-1 rounded-lg text-xl font-bold ${colors[color]}`}
      >
        {value}
      </div>
    </div>
  );
};

export default DashboardCard;

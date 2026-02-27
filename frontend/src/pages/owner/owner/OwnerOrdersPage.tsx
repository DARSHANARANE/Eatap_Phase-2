import { useState } from "react";
import { motion } from "framer-motion";

export default function OwnerOrdersPage() {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 text-sm">
          Manage today’s orders and view order history
        </p>
      </div>

      {/* 🔹 Summary Cards (Only Today) */}
      {activeTab === "today" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Total Orders" value="24" />
          <SummaryCard title="Revenue" value="₹4,320" />
          <SummaryCard title="Pending" value="5" highlight="yellow" />
          <SummaryCard title="Delivered" value="19" highlight="green" />
        </div>
      )}

      {/* 🔹 Tabs */}
      <div className="relative flex w-fit bg-gray-100 rounded-xl p-1">
        <TabButton
          label="Today"
          isActive={activeTab === "today"}
          onClick={() => setActiveTab("today")}
        />
        <TabButton
          label="History"
          isActive={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
      </div>

      {/* 🔹 Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        {activeTab === "today" ? <TodayOrders /> : <OrderHistory />}
      </div>
    </div>
  );
}

/* ================= Components ================= */

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 text-sm font-medium rounded-xl transition ${
        isActive ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white rounded-xl shadow-sm"
          transition={{ type: "spring", duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function SummaryCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: "yellow" | "green";
}) {
  const highlightColor =
    highlight === "yellow"
      ? "text-yellow-600"
      : highlight === "green"
      ? "text-green-600"
      : "text-blue-600";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-xl font-bold mt-2 ${highlightColor}`}>
        {value}
      </h2>
    </div>
  );
}

/* ================= Today Orders ================= */

function TodayOrders() {
  const mockOrders = [
    {
      id: 1,
      name: "Rahul Sharma",
      items: "Veg Thali",
      amount: "₹120",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sneha Patil",
      items: "Paneer + Roti",
      amount: "₹150",
      status: "Delivered",
    },
  ];

  return (
    <div className="space-y-4">
      {mockOrders.length === 0 ? (
        <EmptyState message="No orders placed today." />
      ) : (
        mockOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
          >
            <div>
              <p className="font-medium text-gray-800">{order.name}</p>
              <p className="text-sm text-gray-500">{order.items}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">
                {order.amount}
              </span>
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ================= Order History ================= */

function OrderHistory() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <input
          placeholder="Search by student name..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Pending</option>
          <option>Delivered</option>
          <option>Rejected</option>
        </select>
      </div>

      <EmptyState message="No historical orders found." />
    </div>
  );
}

/* ================= Status Badge ================= */

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Delivered: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Accepted: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        colorMap[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

/* ================= Empty State ================= */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-gray-400 text-sm">
      {message}
    </div>
  );
}
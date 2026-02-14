import { Layers, Clock, CheckCircle, XCircle, Search, Download } from "lucide-react";

interface FilterBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<any>>;

  total: number;
  pending: number;
  approved: number;
  rejected: number;

  onExport?: () => void;

  showStatusButtons?: boolean;
  showExportButton?: boolean;
}

const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  total,
  pending,
  approved,
  rejected,
  onExport,
  showStatusButtons = false,
  showExportButton = false,
}: FilterBarProps) => {
  return (
    <div className="bg-white rounded-t-lg px-6 py-3 flex items-center justify-between gap-10 overflow-x-auto">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        
        {/* 🔍 Search Box */}
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search mess, city, owner..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 
            rounded-full text-sm focus:outline-none focus:ring-2 
            focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ⬇ Export Button */}
        {showExportButton && onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
            rounded-full bg-indigo-600 text-white 
            hover:bg-indigo-700 active:scale-95 
            transition-all duration-200 shadow-sm  cursor-pointer"
          >
            <Download size={16} />
            Export
          </button>
        )}
      </div>

      {/* 🔘 Status Buttons */}
      {showStatusButtons && (
        <div className="flex items-center gap-3 ">
          
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              statusFilter === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <Layers size={16} />
            All ({total})
          </button>

          <button
            onClick={() => setStatusFilter("pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              statusFilter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            <Clock size={16} />
            Pending ({pending})
          </button>

          <button
            onClick={() => setStatusFilter("approved")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              statusFilter === "approved"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            <CheckCircle size={16} />
            Approved ({approved})
          </button>

          <button
            onClick={() => setStatusFilter("rejected")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              statusFilter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            <XCircle size={16} />
            Rejected ({rejected})
          </button>

        </div>
      )}
    </div>
  );
};

export default FilterBar;

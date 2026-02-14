import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNav from "../../../layouts/TopNav";
import FilterBar from "../../../components/common/table/FilterBar";
import { Check, X, Eye  } from "lucide-react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../../../components/common/table/TableUI";


interface Owner {
  _id: string;
  name: string;
  email: string;
}

interface Mess {
  _id: string;
  messName: string;
  city: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
  ownerId: Owner;
}

const MessOwnersList = () => {
  const [data, setData] = useState<Mess[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | "pending" | "approved" | "rejected">("all");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch all mess data
  const fetchMess = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/mess", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMess();
  }, []);

  // 🔹 Approve / Re-approve
  const approve = async (id: string) => {
    await axios.put(
      `http://localhost:5000/api/admin/mess/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setData(prev =>
      prev.map(item =>
        item._id === id ? { ...item, status: "approved", isActive: true } : item
      )
    );
  };

  // 🔹 Reject
  const reject = async (id: string) => {
    await axios.put(
      `http://localhost:5000/api/admin/mess/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setData(prev =>
      prev.map(item =>
        item._id === id ? { ...item, status: "rejected", isActive: false } : item
      )
    );
  };

  // 🔍 Filter + Search
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch =
        item.messName.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.ownerId.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  // 🔢 Status counts
  const counts = useMemo(() => {
    return {
      pending: data.filter(d => d.status === "pending").length,
      approved: data.filter(d => d.status === "approved").length,
      rejected: data.filter(d => d.status === "rejected").length,
    };
  }, [data]);

  // 🧾 Export CSV
  const exportCSV = () => {
    const headers = ["Owner", "Email", "Mess", "City", "Phone", "Status"];
    const rows = filteredData.map(d => [
      d.ownerId.name,
      d.ownerId.email,
      d.messName,
      d.city,
      d.phone,
      d.status,
    ]);

    const csv =
      [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mess-data.csv";
    a.click();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
  <div className="min-h-scree">

    <TopNav
      title="Mess Owners"
      subtitle="Manage and approve mess registrations"
      showBackButton={true}
    />
      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        onExport={exportCSV}
        showStatusButtons={true}
        showExportButton={true}
        total={data.length}
        pending={counts.pending}
        approved={counts.approved}
        rejected={counts.rejected}
      />

    {/* 🖥 Modern Table */}
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Owner</TableHeader>
          <TableHeader>Mess</TableHeader>
          <TableHeader>City</TableHeader>
          <TableHeader>Phone</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
          {filteredData.map(item => (
            <TableRow key={item._id}>

              <TableCell>
                <span className="font-medium text-gray-800">
                  {item.ownerId.name}
                </span>
              </TableCell>

              <TableCell>{item.messName}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>{item.phone}</TableCell>

              <TableCell>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </TableCell>
            <TableCell>
            <div className="flex items-center gap-2">
              {item.status !== "approved" && (
                <button
                  onClick={() => approve(item._id)}
                  className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
              )}

              {item.status !== "rejected" && (
                <button
                  onClick={() => reject(item._id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              )}

              <button
                onClick={() => navigate(`/admin/mess/${item._id}`)}
                className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
                title="View Details"
              >
                <Eye size={16} />
              </button>
            </div>
           </TableCell>
          </TableRow>
          ))}
      </TableBody>

  </Table>
  </div>
);

};

export default MessOwnersList;

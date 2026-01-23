import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mess Owners</h1>

      {/* 🔢 Status badges */}
      <div className="flex gap-4 mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          Pending: {counts.pending}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          Approved: {counts.approved}
        </span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
          Rejected: {counts.rejected}
        </span>
      </div>

      {/* 🔍 Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          placeholder="Search mess / city / owner"
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={exportCSV}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredData.map(item => (
          <div key={item._id} className="border rounded p-4 shadow">
            <p className="font-semibold">{item.messName}</p>
            <p>{item.city}</p>
            <p>{item.ownerId.name}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                item.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : item.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {item.status}
            </span>

            <div className="flex gap-2 mt-3">
              {item.status !== "approved" && (
                <button
                  onClick={() => approve(item._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
              {item.status !== "rejected" && (
                <button
                  onClick={() => reject(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🖥 Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow border overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Owner</th>
              <th className="p-3">Mess</th>
              <th className="p-3">City</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item._id} className="border-t text-center">
                <td className="p-3">{item.ownerId.name}</td>
                <td className="p-3">{item.messName}</td>
                <td className="p-3">{item.city}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  {item.status !== "approved" && (
                    <button
                      onClick={() => approve(item._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                  {item.status !== "rejected" && (
                    <button
                      onClick={() => reject(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  )}
                  <button onClick={() => navigate(`/admin/mess/${item._id}`)} className="px-3 py-1 bg-blue-600 text-white rounded" > Details </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessOwnersList;

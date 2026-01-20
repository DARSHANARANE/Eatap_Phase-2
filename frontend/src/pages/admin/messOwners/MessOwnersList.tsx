import { useEffect, useState } from "react";
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
  address: string;
  city: string;
  phone: string;
  mealType: "veg" | "nonveg" | "both";
  isActive: boolean;
  ownerId: Owner;
}

const MessOwnersList = () => {
  const [data, setData] = useState<Mess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch pending mess profiles
  const fetchPendingMess = async () => {
    try {
      const res = await axios.get<Mess[]>(
        "http://localhost:5000/api/admin/mess/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (error) {
      console.error("Failed to load mess owners", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Approve mess
  const approve = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/mess/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to approve mess");
    }
  };

  // 🔹 Reject mess
  const reject = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/mess/${id}/reject`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to reject mess");
    }
  };

  useEffect(() => {
    fetchPendingMess();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Pending Mess Owners</h1>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mess Name</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No pending mess profiles
                </td>
              </tr>
            )}

            {data.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.ownerId.name}</td>
                <td className="p-3">{item.ownerId.email}</td>
                <td className="p-3">{item.messName}</td>
                <td className="p-3">{item.city}</td>
                <td className="p-3">{item.phone}</td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => approve(item._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => reject(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => navigate(`/admin/mess/${item._id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Details
                  </button>
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

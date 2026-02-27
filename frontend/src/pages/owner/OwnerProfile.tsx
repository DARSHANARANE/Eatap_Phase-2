import { useEffect, useState } from "react";
import axios from "axios";
import { useOwner } from "../../hooks/useOwner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OwnerProfile = () => {
  const { owner, loading: ownerLoading } = useOwner();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    messName: "",
    address: "",
    city: "",
    phone: "",
    mealType: "veg",
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = !!owner?._id;

  // 🔥 Auto-fill form if data exists
  useEffect(() => {
    if (owner) {
      setFormData({
        messName: owner.messName || "",
        address: owner.address || "",
        city: owner.city || "",
        phone: owner.phone || "",
        mealType: owner.mealType || "veg",
      });
    }
  }, [owner]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (isEditMode) {
        // ✅ UPDATE PROFILE
        await axios.put(
          `http://localhost:5000/api/owner/messes/${owner._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Profile Updated Successfully 🎉");
      } else {
        // ✅ CREATE PROFILE
        await axios.post(
          "http://localhost:5000/api/owner/messes",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Profile Created Successfully 🎉");
      }

      navigate("/owner/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  if (ownerLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? "Update Mess Profile" : "Create Mess Profile"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mess Name
          </label>
          <input
            name="messName"
            value={formData.messName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Meal Type
          </label>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Profile"
            : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default OwnerProfile;
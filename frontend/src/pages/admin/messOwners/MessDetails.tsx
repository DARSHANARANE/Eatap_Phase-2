// frontend/src/pages/MessDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Menu {
  _id: string;
  messId: string;
  date: string;
  lunch: string[];
  dinner: string[];
}

const MessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);

  const token = localStorage.getItem("token");

  // Fetch menus for this mess
  const fetchMenus = async () => {
    if (!id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/menu/mess/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch menus");

      const data = await res.json();
      setMenus(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching menus");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [id]);

  // Add Menu
  const addMenu = async () => {
    const lunch = prompt("Enter lunch items (comma separated)")?.split(",") || [];
    const dinner = prompt("Enter dinner items (comma separated)")?.split(",") || [];
    const date = prompt("Enter date (YYYY-MM-DD)") || new Date().toISOString().split("T")[0];

    try {
      const res = await fetch(`http://localhost:5000/api/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messId: id,
          date,
          lunch,
          dinner,
        }),
      });

      if (!res.ok) throw new Error("Failed to add menu");

      const newMenu = await res.json();
      setMenus((prev) => [...prev, newMenu]);
      alert("Menu added successfully 🎉");
    } catch (err) {
      console.error(err);
      alert("Error adding menu");
    }
  };

  // Edit Menu
  const editMenu = async (menu: Menu) => {
    const lunch = prompt("Edit lunch items (comma separated)", menu.lunch.join(","))?.split(",") || [];
    const dinner = prompt("Edit dinner items (comma separated)", menu.dinner.join(","))?.split(",") || [];
    const date = prompt("Edit date (YYYY-MM-DD)", menu.date) || menu.date;

    try {
      const res = await fetch(`http://localhost:5000/api/menu/${menu._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, lunch, dinner }),
      });

      if (!res.ok) throw new Error("Failed to update menu");

      const updatedMenu = await res.json();
      setMenus((prev) => prev.map((m) => (m._id === updatedMenu._id ? updatedMenu : m)));
      alert("Menu updated successfully 🎉");
    } catch (err) {
      console.error(err);
      alert("Error updating menu");
    }
  };

  // Delete Menu
  const deleteMenu = async (menuId: string) => {
    if (!confirm("Are you sure you want to delete this menu?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/menu/${menuId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete menu");

      setMenus((prev) => prev.filter((m) => m._id !== menuId));
      alert("Menu deleted successfully 🎉");
    } catch (err) {
      console.error(err);
      alert("Error deleting menu");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mess Menus</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Menu Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menus</h2>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={addMenu}
          >
            + Add Menu
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Date</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu) => (
              <tr key={menu._id} className="border-b">
                <td className="py-2">{new Date(menu.date).toLocaleDateString()}</td>
                <td>{menu.lunch.join(", ")}</td>
                <td>{menu.dinner.join(", ")}</td>
                <td className="space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => editMenu(menu)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteMenu(menu._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {menus.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">No menu added yet</p>
        )}
      </div>
    </div>
  );
};

export default MessDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuDialog from "../../../components/common/MenuDialog";
import DeleteDialog from "../../../components/common/DeleteDialog";


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
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch menus
  const fetchMenus = async () => {
    if (!id) return;

    const res = await fetch(
      `http://localhost:5000/api/menu/mess/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setMenus(data);
  };

  useEffect(() => {
    fetchMenus();
  }, [id]);

  // Add Menu
  const handleAddMenu = async (data: any) => {
    const res = await fetch(`http://localhost:5000/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, messId: id }),
    });

    const newMenu = await res.json();
    setMenus((prev) => [...prev, newMenu]);
    setOpenMenuDialog(false);
  };

  // Edit Menu
  const handleEditMenu = async (data: any) => {
    if (!selectedMenu) return;

    const res = await fetch(
      `http://localhost:5000/api/menu/${selectedMenu._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const updatedMenu = await res.json();
    setMenus((prev) =>
      prev.map((m) =>
        m._id === updatedMenu._id ? updatedMenu : m
      )
    );

    setOpenMenuDialog(false);
    setSelectedMenu(null);
  };

  // Delete Menu
  const handleDeleteMenu = async () => {
    if (!selectedMenu) return;

    await fetch(
      `http://localhost:5000/api/menu/${selectedMenu._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setMenus((prev) =>
      prev.filter((m) => m._id !== selectedMenu._id)
    );

    setOpenDeleteDialog(false);
    setSelectedMenu(null);
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
            onClick={() => {
              setSelectedMenu(null);
              setOpenMenuDialog(true);
            }}
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
                <td className="py-2">
                  {new Date(menu.date).toLocaleDateString()}
                </td>
                <td>{menu.lunch.join(", ")}</td>
                <td>{menu.dinner.join(", ")}</td>
                <td className="space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setSelectedMenu(menu);
                      setOpenMenuDialog(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => {
                      setSelectedMenu(menu);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {menus.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            No menu added yet
          </p>
        )}
      </div>

      {/* Dialogs */}
      <MenuDialog
        open={openMenuDialog}
        initialData={selectedMenu || undefined}
        onClose={() => setOpenMenuDialog(false)}
        onSubmit={selectedMenu ? handleEditMenu : handleAddMenu}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteMenu}
      />
    </div>
  );
};

export default MessDetails;

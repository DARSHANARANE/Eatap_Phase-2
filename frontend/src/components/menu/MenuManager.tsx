import { useEffect, useState } from "react";
import MenuDialog from "../common/MenuDialog";
import DeleteDialog from "../common/DeleteDialog";
import TopNav from "../../layouts/TopNav";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Menu {
  _id: string;
  messId: string;
  date: string;
  lunch: string[];
  dinner: string[];
}

interface MenuManagerProps {
  messId: string;
  title: string;
  showBackButton?: boolean;
}

const MenuManager = ({ messId, title, showBackButton }: MenuManagerProps) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch menus
  const fetchMenus = async () => {
    if (!messId) return;

    const res = await fetch(
      `http://localhost:5000/api/menu/mess/${messId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setMenus(data);
  };

  useEffect(() => {
    fetchMenus();
  }, [messId]);

  // Add
  const handleAddMenu = async (data: any) => {
    const res = await fetch(`http://localhost:5000/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, messId }),
    });

    const newMenu = await res.json();
    setMenus((prev) => [...prev, newMenu]);
    setOpenMenuDialog(false);
  };

  // Edit
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
      prev.map((m) => (m._id === updatedMenu._id ? updatedMenu : m))
    );

    setOpenMenuDialog(false);
    setSelectedMenu(null);
  };

  // Delete
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
    <div>
      <TopNav title={title} showBackButton={showBackButton} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Menus</h2>

          <button
            className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium"
            onClick={() => {
              setSelectedMenu(null);
              setOpenMenuDialog(true);
            }}
          >
            <Plus size={18} /> Add Menu
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-indigo-800 text-white text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Lunch</th>
                <th className="px-6 py-3 text-left">Dinner</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {menus.map((menu) => (
                <tr key={menu._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {new Date(menu.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{menu.lunch.join(", ")}</td>
                  <td className="px-6 py-4">{menu.dinner.join(", ")}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600"
                      onClick={() => {
                        setSelectedMenu(menu);
                        setOpenMenuDialog(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="p-2 rounded-full hover:bg-red-100 text-red-600"
                      onClick={() => {
                        setSelectedMenu(menu);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {menus.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No menus added yet
          </div>
        )}
      </div>

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

export default MenuManager;
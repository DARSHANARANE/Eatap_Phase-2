import { useEffect, useState } from "react";
import MenuDialog from "../common/MenuDialog";
import DeleteDialog from "../common/DeleteDialog";

interface Menu {
  _id: string;
  messId: string;
  date: string;
  lunch: string[];
  dinner: string[];
}

interface Props {
  messId: string;
  showBack?: boolean;
  canDelete?: boolean;
}

const MessMenuManager = ({
  messId,
  showBack = false,
  canDelete = true,
}: Props) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMenus = async () => {
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

  // ADD
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

  // UPDATE
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

    setSelectedMenu(null);
    setOpenMenuDialog(false);
  };

  // DELETE
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

    setSelectedMenu(null);
    setOpenDeleteDialog(false);
  };

  return (
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

                {canDelete && (
                  <button
                    className="text-red-600"
                    onClick={() => {
                      setSelectedMenu(menu);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Delete
                  </button>
                )}
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

export default MessMenuManager;

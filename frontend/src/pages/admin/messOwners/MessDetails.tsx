import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuDialog from "../../../components/common/MenuDialog";
import DeleteDialog from "../../../components/common/DeleteDialog";
import TopNav from "../../../layouts/TopNav";
import { Pencil, Trash2, Plus  } from "lucide-react";
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
    <div className="">
      {/* Header */}
      <TopNav
        title="Mess Details"
        showBackButton={true}
      />  
      {/* Menu Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Menus</h2>
        {/* Add Menu Button */}
          <button
            className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 shadow-sm transition text-white px-5 py-2 rounded-xl text-sm font-medium"
            onClick={() => {
              setSelectedMenu(null);
              setOpenMenuDialog(true);
            }}
           >
           <Plus size={18} /> Add Menu
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 overflow-hidden">
            
            {/* Table Head */}
            <thead className="bg-indigo-800 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Lunch</th>
                <th className="px-6 py-3 text-left">Dinner</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {menus.map((menu) => (
                <tr
                  key={menu._id}
                  className="hover:bg-gray-50 transition even:bg-gray-200 odd:bg-white"
                >
                  <td className="px-6 py-4 font-medium">
                    {new Date(menu.date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {menu.lunch.join(", ")}
                  </td>

                  <td className="px-6 py-4">
                    {menu.dinner.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600 transition"
                      onClick={() => {
                        setSelectedMenu(menu);
                        setOpenMenuDialog(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
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
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">
              No menus added yet
            </p>
          </div>
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

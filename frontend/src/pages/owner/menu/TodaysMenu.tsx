import { useEffect, useState } from "react";
import { useOwner } from "../../../hooks/useOwner";
import TodayMenuForm from "../../../components/menu/TodayMenuForm";

interface Menu {
  _id?: string;
  messId: string;
  date: string;
  lunch: string[];
  dinner: string[];
}

const TodaysMenu = () => {
  const { owner, loading } = useOwner();

  const [menu, setMenu] = useState<Menu | null>(null);
  const [newLunch, setNewLunch] = useState("");
  const [newDinner, setNewDinner] = useState("");
  const [isExisting, setIsExisting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (owner?.messId) {
      fetchTodaysMenu();
    }
  }, [owner]);

  // -------------------------
  // Fetch Today's Menu
  // -------------------------

  const fetchTodaysMenu = async () => {
    try {
      const res = await fetch(
  `http://localhost:5000/api/menu/today/${owner?.messId}`
);

      if (res.status === 404) {
        // No menu found → create empty
        setMenu({
          messId: owner!.messId,
          date: today,
          lunch: [],
          dinner: [],
        });
        setIsExisting(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch menu");
      }

      const data = await res.json();
      setMenu(data);
      setIsExisting(true);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!owner?.messId) return <p>No mess assigned</p>;
  if (!menu) return null;

  // -------------------------
  // Add Items
  // -------------------------

  const handleAddLunch = () => {
    if (!newLunch.trim()) return;

    setMenu((prev) =>
      prev ? { ...prev, lunch: [...prev.lunch, newLunch.trim()] } : prev
    );

    setNewLunch("");
  };

  const handleAddDinner = () => {
    if (!newDinner.trim()) return;

    setMenu((prev) =>
      prev ? { ...prev, dinner: [...prev.dinner, newDinner.trim()] } : prev
    );

    setNewDinner("");
  };

  // -------------------------
  // Delete Items
  // -------------------------

  const handleDeleteLunch = (index: number) => {
    setMenu((prev) =>
      prev
        ? { ...prev, lunch: prev.lunch.filter((_, i) => i !== index) }
        : prev
    );
  };

  const handleDeleteDinner = (index: number) => {
    setMenu((prev) =>
      prev
        ? { ...prev, dinner: prev.dinner.filter((_, i) => i !== index) }
        : prev
    );
  };

  // -------------------------
  // Save (Create / Update)
  // -------------------------

  const handleSaveMenu = async () => {
    try {
      const method = menu._id ? "PUT" : "POST";
      const url = menu._id
        ? `/api/menu/${menu._id}`
        : `/api/menu`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      });

      if (!res.ok) {
        throw new Error("Failed to save menu");
      }

      const data = await res.json();
      setMenu(data);
      setIsExisting(true);

      alert(menu._id ? "Updated successfully" : "Created successfully");
    } catch (error) {
      console.error("Save error:", error);
      alert("Something went wrong");
    }
  };

  // -------------------------
  // Delete Full Menu
  // -------------------------

  const handleDeleteMenu = async () => {
    if (!menu._id) return;

    try {
      const res = await fetch(`/api/menu/${menu._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      alert("Today's menu deleted");

      setMenu({
        messId: owner.messId,
        date: today,
        lunch: [],
        dinner: [],
      });

      setIsExisting(false);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting menu");
    }
  };

  return (
    <TodayMenuForm
      menu={menu}
      newLunch={newLunch}
      newDinner={newDinner}
      setNewLunch={setNewLunch}
      setNewDinner={setNewDinner}
      onAddLunch={handleAddLunch}
      onAddDinner={handleAddDinner}
      onDeleteLunch={handleDeleteLunch}
      onDeleteDinner={handleDeleteDinner}
      onSave={handleSaveMenu}
      onDelete={handleDeleteMenu}
      isExisting={isExisting}
    />
  );
};

export default TodaysMenu;
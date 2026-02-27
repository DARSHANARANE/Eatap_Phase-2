import React from "react";
import TopNav from "../../layouts/TopNav";

interface Menu {
  _id?: string;
  messId: string;
  date: string;
  lunch: string[];
  dinner: string[];
}

interface Props {
  menu: Menu;
  newLunch: string;
  newDinner: string;
  setNewLunch: (value: string) => void;
  setNewDinner: (value: string) => void;
  onAddLunch: () => void;
  onAddDinner: () => void;
  onDeleteLunch: (index: number) => void;
  onDeleteDinner: (index: number) => void;
  onSave: () => void;
  onDelete: () => void;
  isExisting: boolean;
}

const TodayMenuForm: React.FC<Props> = ({
  menu,
  newLunch,
  newDinner,
  setNewLunch,
  setNewDinner,
  onAddLunch,
  onAddDinner,
  onDeleteLunch,
  onDeleteDinner,
  onSave,
  onDelete,
  isExisting,
}) => {
  return (
    <div>
          <TopNav title={`  📅 Today's Menu (${menu.date})`} showBackButton={true} />
          <div className="py-2 max-w-5xl mx-auto">

      <div className="grid md:grid-cols-2 gap-6">
        {/* ---------------- LUNCH ---------------- */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">🍛 Lunch</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={newLunch}
              onChange={(e) => setNewLunch(e.target.value)}
              placeholder="Add lunch item"
              className="flex-1 border p-2 rounded-lg"
            />
            <button
              onClick={onAddLunch}
              className="bg-green-500 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {menu.lunch.length === 0 && (
            <p className="text-gray-400">No lunch items added.</p>
          )}

          {menu.lunch.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
            >
              <span>{item}</span>
              <button
                onClick={() => onDeleteLunch(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* ---------------- DINNER ---------------- */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">🌙 Dinner</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={newDinner}
              onChange={(e) => setNewDinner(e.target.value)}
              placeholder="Add dinner item"
              className="flex-1 border p-2 rounded-lg"
            />
            <button
              onClick={onAddDinner}
              className="bg-blue-500 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {menu.dinner.length === 0 && (
            <p className="text-gray-400">No dinner items added.</p>
          )}

          {menu.dinner.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
            >
              <span>{item}</span>
              <button
                onClick={() => onDeleteDinner(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- ACTION BUTTONS ---------------- */}
      <div className="flex gap-4 mt-8 justify-center">
        <button
          onClick={onSave}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          {isExisting ? "Update Today's Menu" : "Create Today's Menu"}
        </button>

        {isExisting && (
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Delete Today's Menu
          </button>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default TodayMenuForm;
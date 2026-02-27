import Menu from "../models/Menu.js";

/**
 * ADD MENU (Admin / Owner)
 */
// export const addMenu = async (req, res) => {
//   try {
//     const { messId, date, lunch, dinner } = req.body;

//     const menu = await Menu.create({
//       messId,
//       date,
//       lunch,
//       dinner,
//       createdBy: req.user?._id, // optional
//     });

//     res.status(201).json(menu);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
export const addMenu = async (req, res) => {
  try {
    const { messId, date, lunch, dinner } = req.body;

    // Check if menu already exists
    const existingMenu = await Menu.findOne({ messId, date });

    if (existingMenu) {
      return res.status(400).json({
        message: "Menu for this date already exists. Please update instead.",
      });
    }

    const menu = await Menu.create({
      messId,
      date,
      lunch,
      dinner,
      createdBy: req.user?._id,
    });

    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
/**
 * UPDATE MENU
 */
export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE MENU (Admin)
 */
export const deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET ALL MENUS BY MESS (Details Page)
 */
export const getMenusByMess = async (req, res) => {
  try {
    const menus = await Menu.find({ messId: req.params.messId })
      .sort({ date: -1 });

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menus" });
  }
};

/**
 * STUDENT – GET TODAY MENU
 */
export const getTodayMenu = async (req, res) => {
  try {
    const { messId } = req.params;

    const today = new Date().toISOString().split("T")[0];

    const menu = await Menu.findOne({
      messId,
      date: today,
    });

    if (!menu) {
      return res.status(404).json({ message: "No menu found for today" });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

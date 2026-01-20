import Mess from "../models/Mess.js";

export const getPendingMess = async (req, res) => {
  try {
    const messes = await Mess.find({ isActive: false })
      .populate("ownerId", "name email");

    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mess profiles" });
  }
};


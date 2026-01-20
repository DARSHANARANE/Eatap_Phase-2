import Mess from "../models/Mess.js";
import User from "../models/User.js";

/**
 * @desc Create Mess Profile
 * @route POST /api/owner/messes
 * @access Owner
 */
export const createMess = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // 1️⃣ Check if profile already exists
    const existingProfile = await Mess.findOne({ ownerId });
    if (existingProfile) {
      return res.status(400).json({
        message: "Mess profile already exists"
      });
    }

    // 2️⃣ Create mess profile
    const profile = await Mess.create({
      ownerId,
      messName: req.body.messName,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      mealType: req.body.mealType
    });

    // 3️⃣ Update user status → pending_admin
    await User.findByIdAndUpdate(ownerId, {
      status: "pending_admin"
    });

    res.status(201).json({
      message: "Mess profile submitted, waiting for admin approval",
      profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

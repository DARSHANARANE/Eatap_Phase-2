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

    // Check if mess already exists
    const existingProfile = await Mess.findOne({ ownerId });
    if (existingProfile) {
      return res.status(400).json({
        message: "Mess profile already exists"
      });
    }

    const profile = await Mess.create({
      ownerId,
      messName: req.body.messName,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      mealType: req.body.mealType,
      status: "pending" // important for admin approval
    });

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


/**
 * @desc Get Owner Profile (VERY IMPORTANT)
 * @route GET /api/owner/profile
 * @access Owner
 */
export const getOwnerProfile = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const mess = await Mess.findOne({ ownerId });

    if (!mess) {
      return res.status(404).json({
        message: "No mess assigned"
      });
    }

    res.status(200).json(mess);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(mess);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
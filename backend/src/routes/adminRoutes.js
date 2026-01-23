import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Mess from "../models/Mess.js";

const router = express.Router();

/**
 * GET all messes OR filter by status
 * /api/admin/mess
 * /api/admin/mess?status=pending
 * /api/admin/mess?status=approved
 * /api/admin/mess?status=rejected
 */
router.get(
  "/mess",
  protect,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.query;

      const filter = {};
      if (status) filter.status = status;

      const messes = await Mess.find(filter).populate("ownerId");

      res.json(messes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mess data", error });
    }
  }
);

/**
 * APPROVE mess
 */
router.put(
  "/mess/:id/approve",
  protect,
  adminMiddleware,
  async (req, res) => {
    try {
      const mess = await Mess.findById(req.params.id);

      if (!mess) {
        return res.status(404).json({ message: "Mess not found" });
      }

      mess.status = "approved";
      mess.isActive = true;

      await mess.save();

      res.json({ message: "Mess approved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Approve failed", error });
    }
  }
);

/**
 * REJECT mess (NO DELETE)
 */
router.put(
  "/mess/:id/reject",
  protect,
  adminMiddleware,
  async (req, res) => {
    try {
      const mess = await Mess.findById(req.params.id);

      if (!mess) {
        return res.status(404).json({ message: "Mess not found" });
      }

      mess.status = "rejected";
      mess.isActive = false;

      await mess.save();

      res.json({ message: "Mess rejected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Reject failed", error });
    }
  }
);

export default router;

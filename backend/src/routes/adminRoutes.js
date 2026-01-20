import express from "express";
import { getPendingMess } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Mess from "../models/Mess.js";

const router = express.Router();

// GET pending mess profiles (ADMIN ONLY)
router.get(
  "/mess/pending",
  protect,
  adminMiddleware,
  getPendingMess
);
// TEMP: get all messes
router.get("/mess/all", async (req, res) => {
  const messes = await Mess.find();
  res.json(messes);
});

export default router;

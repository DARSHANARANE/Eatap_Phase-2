import express from "express";
import { createMess } from "../controllers/ownerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/messes", protect, createMess);

export default router;

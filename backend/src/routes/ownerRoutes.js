import express from "express";
import { createMess, getOwnerProfile, updateMess } from "../controllers/ownerController.js";
import { protect  } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/messes", protect, createMess);
router.get("/profile", protect, getOwnerProfile);
router.put("/messes/:id", protect, authorizeRoles("owner"), updateMess);
export default router;
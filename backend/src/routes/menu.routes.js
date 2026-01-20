import express from "express";
import {
  addMenu,
  updateMenu,
  deleteMenu,
  getMenusByMess,
  getTodayMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/", addMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

router.get("/mess/:messId", getMenusByMess);
router.get("/today/:messId", getTodayMenu);

export default router;

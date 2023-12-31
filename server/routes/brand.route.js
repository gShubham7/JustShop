import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brand.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const brandRouter = Router();

brandRouter.post("/", authMiddleware, isAdmin, createBrand);
brandRouter.put("/:id", authMiddleware, isAdmin, updateBrand);
brandRouter.delete("/:id", authMiddleware, isAdmin, deleteBrand);
brandRouter.get("/:id", getBrand);
brandRouter.get("/", getAllBrand);

export { brandRouter };

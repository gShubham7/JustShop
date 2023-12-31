import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  getProductCategory,
  updateProductCategory,
} from "../controllers/productCategory.controller.js";

const productCategoryRouter = Router();

productCategoryRouter.post("/", authMiddleware, isAdmin, createProductCategory);
productCategoryRouter.put(
  "/:id",
  authMiddleware,
  isAdmin,
  updateProductCategory
);
productCategoryRouter.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  deleteProductCategory
);
productCategoryRouter.get("/:id", authMiddleware, getProductCategory);
productCategoryRouter.get("/", authMiddleware, getAllProductCategory);

export { productCategoryRouter };

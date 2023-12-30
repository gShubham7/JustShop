import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  rating,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/", authMiddleware, isAdmin, createProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);
productRouter.put("/wishlist", authMiddleware, addToWishlist);
productRouter.put("/rating", authMiddleware, rating);
productRouter.get("/", getAllProduct);

export { productRouter };

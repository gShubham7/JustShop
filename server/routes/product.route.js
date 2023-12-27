import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
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
productRouter.put("/wishlist", authMiddleware, addToWishlist);
productRouter.put("/rating", authMiddleware, rating);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);
productRouter.get("/", getAllProduct);

export { productRouter };

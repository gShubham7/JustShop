import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  rating,
  removeImages,
  updateProduct,
  uploadImages,
} from "../controllers/product.controller.js";
import {
  productImgResize,
  uploadPhoto,
} from "../middlewares/uploadImage.middleware.js";

const productRouter = Router();

productRouter.post("/", authMiddleware, isAdmin, createProduct);
productRouter.put("/rating", authMiddleware, rating);
productRouter.post(
  "/upload",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
productRouter.delete("/remove-img/:id", authMiddleware, isAdmin, removeImages);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);
productRouter.get("/", getAllProduct);

export { productRouter };

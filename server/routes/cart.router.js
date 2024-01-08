import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCart,
  emptyCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/", authMiddleware, createCart);
cartRouter.delete("/", authMiddleware, emptyCart);
cartRouter.delete("/:id", authMiddleware, removeItemFromCart);
cartRouter.get("/", authMiddleware, getCart);

export { cartRouter };

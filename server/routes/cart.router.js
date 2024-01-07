import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCart, getCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/", authMiddleware, createCart);
cartRouter.get("/", authMiddleware, getCart);

export { cartRouter };

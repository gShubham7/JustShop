import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
orderRouter.get("/get-orders/:id", authMiddleware, getOrders);
orderRouter.put(
  "/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

export { orderRouter };

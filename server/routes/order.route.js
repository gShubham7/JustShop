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
orderRouter.get("/get-orders", authMiddleware, getOrders);
orderRouter.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
orderRouter.put(
  "/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

export { orderRouter };

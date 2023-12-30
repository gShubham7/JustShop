import { Router } from "express";
import {
  blockUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  resetPassword,
  unblockUser,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.put("/password", authMiddleware, updatePassword);
userRouter.post("/forgot-password", forgotPassword);
userRouter.put("/reset-password/:token", resetPassword);
userRouter.get("/all-users", authMiddleware, isAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, getSingleUser);
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);
userRouter.put("/:id", authMiddleware, isAdmin, updateUser);
userRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export { userRouter };

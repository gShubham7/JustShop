import { Router } from "express";
import {
  addToWishlist,
  blockUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getWishlist,
  resetPassword,
  saveAddress,
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
userRouter.put("/wishlist", authMiddleware, addToWishlist);
userRouter.get("/wishlist", authMiddleware, getWishlist);
userRouter.put("/save-address", authMiddleware, saveAddress);
userRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
userRouter.get("/:id", authMiddleware, getSingleUser);
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);
userRouter.put("/:id", authMiddleware, isAdmin, updateUser);

export { userRouter };

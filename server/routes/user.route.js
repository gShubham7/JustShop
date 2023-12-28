import { Router } from "express";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  unblockUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/all-users", authMiddleware, isAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, getSingleUser);
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);
userRouter.put("/:id", authMiddleware, isAdmin, updateUser);
userRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export { userRouter };

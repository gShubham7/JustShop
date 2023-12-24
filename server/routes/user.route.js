import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/all-users", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);

export { userRouter };

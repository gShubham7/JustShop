import { Router } from "express";
import {
  handleRefreshToken,
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/refresh", handleRefreshToken);
authRouter.get("/logout", logoutUser);

export { authRouter };

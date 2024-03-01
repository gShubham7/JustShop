import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(401).json({ message: "Unauthorized Access", success: false });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    res.status(401).json({ message: "Unauthorized Access", success: false });
  } else {
    next();
  }
});

export { authMiddleware, isAdmin };

import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return crypto.createHash("sha256").update(token).digest("hex");
};

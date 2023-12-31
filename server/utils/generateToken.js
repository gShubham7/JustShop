import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return crypto.createHash("sha256").update(token).digest("hex");
};

export { generateLoginToken, generateRefreshToken, generatePasswordResetToken };

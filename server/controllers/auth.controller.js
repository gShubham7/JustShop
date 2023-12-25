import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const salt = await bcrypt.genSaltSync(10);
    const hshedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hshedPassword,
    });
    res.status(201).json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    const { _id, firstname, lastname, email, mobile } = findUser;
    const refreshToken = generateRefreshToken(_id);
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({ firstname, lastname, email, mobile, token: generateToken(_id) });
  } else {
    throw new Error("Invalid Credintials");
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Refresh token not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) throw new Error("Something went wrong");
    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.sendStatus(204);
});

export { registerUser, loginUser, handleRefreshToken, logoutUser };

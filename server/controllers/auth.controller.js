import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

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
    res.json({ firstname, lastname, email, mobile, token: generateToken(_id) });
  } else {
    throw new Error("Invalid Credintials");
  }
});

export { registerUser, loginUser };

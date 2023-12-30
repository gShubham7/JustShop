import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { validateMongodbId } from "../utils/validateMongodbId.js";
import bcrypt from "bcrypt";
import { generatePasswordResetToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateHashedPassword } from "../utils/generateHashedPassword.js";

//Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get Single User
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getUser = await User.findById(id);
    res.status(200).json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete A User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Update A User
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { firstname, lastname, email, mobile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        mobile,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json(block);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json(unblock);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);

  try {
    if (user && !(await bcrypt.compare(password, user.password))) {
      const hashedPassword = await generateHashedPassword(password);
      user.password = hashedPassword;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exists");
  try {
    const passwordResetToken = generatePasswordResetToken();
    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    await user.save();
    const resetURL = `Hi, Please follow this link to rest your password <a href="http://localhost:${process.env.PORT}/api/user/reset-password/${passwordResetToken}">Click Here</a>`;
    const data = {
      to: email,
      subject: "Forgot Password Link",
      text: `Hey`,
      html: resetURL,
    };
    sendEmail(data);
    res.json(passwordResetToken);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again later");
  try {
    const hashedPassword = await generateHashedPassword(password);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};

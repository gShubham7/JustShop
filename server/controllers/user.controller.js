import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { validateMongodbId } from "../utils/validateMongodbId.js";

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
  const { _id } = req.user;
  try {
    const { firstname, lastname, email, mobile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
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

export {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
};

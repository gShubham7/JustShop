import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongodbId.js";
import { Cart } from "../models/cart.model.js";

const getCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const cart = await Cart.findOne({ orderBy: _id }).populate("items.product");

    if (!cart) {
      throw new Error({ message: "Cart Not Found" });
    } else {
      res.json(cart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ orderBy: _id });
    if (!cart) {
      cart = await Cart.create({
        orderBy: _id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
    await cart.save();
    cart = await Cart.findOne({ orderBy: _id }).populate("items.product");

    cart.cartTotal = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { _id } = req.user;
  try {
    const cart = await Cart.findOne({ orderBy: _id });
    cart.items = cart.items.filter((item) => item.product.toString() !== id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    await Cart.findOneAndDelete({ orderBy: _id });
    res.json({
      message: "All items are removed from the cart.",
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { createCart, getCart, removeItemFromCart, emptyCart };

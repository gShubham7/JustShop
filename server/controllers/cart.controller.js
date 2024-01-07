import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongodbId.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

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
      const product = await Product.findById(productId);
      cart.cartTotal = product.price * quantity;
      await cart.save();
      res.json(cart);
    } else {
      const existingItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      const itemPromises = cart.items.map(async (item) => {
        const product = await Product.findById(item.product);
        const productPrice = product ? product.price : 0;
        return productPrice * item.quantity;
      });

      const itemTotals = await Promise.all(itemPromises);

      cart.cartTotal = itemTotals.reduce(
        (total, itemTotal) => total + itemTotal,
        0
      );
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export { createCart, getCart };

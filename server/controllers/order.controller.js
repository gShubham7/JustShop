import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongodbId.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD } = req.body;
  validateMongodbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const userCart = await Cart.findOne({ orderBy: _id });

    const newOrder = await new Order({
      products: userCart.items,
      paymentIntent: {
        method: "COD",
        amount: userCart.cartTotal,
        status: "Cash On Delivery",
        created: Date.now(),
        currency: "INR",
      },
      orderBy: _id,
      orderStatus: "Cash On Delivery",
    }).save();

    const update = userCart.items.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    });
    await Product.bulkWrite(update, {});
    res.json(newOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const userOrders = await Order.findOne({ orderBy: id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(userOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const allUserOrders = await Order.find()
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(allUserOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updatedOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

export { createOrder, getOrders, getAllOrders, updateOrderStatus };

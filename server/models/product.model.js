import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = model("Product", productSchema);

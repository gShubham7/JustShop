import { Schema, model } from "mongoose";

const productCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    versionKey: false,
  },
  {
    timestamps: true,
  }
);

export const ProductCategory = model("ProductCategory", productCategorySchema);

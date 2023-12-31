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
    timestamps: true,
    versionKey: false,
  }
);

export const ProductCategory = model("ProductCategory", productCategorySchema);

import { Schema, model } from "mongoose";

const brandSchema = new Schema(
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

export const Brand = model("Brand", brandSchema);

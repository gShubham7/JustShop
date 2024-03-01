import asyncHandler from "express-async-handler";
import { Product } from "../models/product.model.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongodbId.js";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import fs from "fs";

const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    // Pagination
    const { page } = req.query;
    const { limit } = req.query;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const finalProducts = await query;
    res.json(finalProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    const alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const ratedProduct = await Product.findById(prodId);
    const totalRating = ratedProduct.ratings.length;
    const ratingSum = ratedProduct.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    const actualRating = Math.round(ratingSum / totalRating);
    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      // fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const removeImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleted = cloudinaryRemoveImage(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  rating,
  uploadImages,
  removeImages,
};

import Category from "../models/category.model.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.config.js";

// Get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all categories!",
      data: categories,
    });
  } catch (error) {
    console.log("Error fetching categories", error);
    next(error);
  }
};

// Get category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return next({ statusCode: 404, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched category!",
      data: category,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

// Get category by artistId
export const getCategoryByArtistId = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const categories = await Category.find({ artist: artistId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched categories!",
      data: categories,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

// Create category
export const createCategory = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    console.log(req.params);
    const { name, description } = req.body;
    console.log(req.file);

    if (!name || !description || !artistId) {
      next({
        statusCode: 400,
        message: "Please fill in all the required fields",
      });
    }

    const imageUploadResult = await uploadToCloudinary(req.file);
    const newCategory = new Category({
      artist: artistId,
      name,
      description,
      image: {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url,
      },
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Successfully created category!",
      data: savedCategory,
    });
  } catch (error) {
    console.log("Error creating category", error);
    next({
      statusCode: 500,
      message: "Error creating category",
      error: error.message,
    });
  }
};

// Update category
export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      next({ statusCode: 400, message: "Please fill in all the fields" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return next({ statusCode: 400, message: "Category not found" });
    }

    category.deleteImage();

    const imageUploadResult = await uploadToCloudinary(req.file);

    category.name = name;
    category.description = description;
    category.image = {
      public_id: imageUploadResult.public_id,
      url: imageUploadResult.secure_url,
    };
    await category.save();
    res
      .status(200)
      .json({ message: "Successfully updated", success: true, data: category });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error updating category",
      error: error.message,
    });
  }
};

// Delete category
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return next({ statusCode: 404, message: "Category not found" });
    }

    category.deleteImage();

    res.status(200).json({
      success: true,
      message: "Successfully deleted category!",
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error deleting category",
      error: error.message,
    });
  }
};

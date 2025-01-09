import { Request, Response, NextFunction } from "express";
import Category from "../models/category.model";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.config";

// Get all categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      error: (error as Error).message,
    });
  }
};

// Get category by artistId
export const getCategoryByArtistId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artistId } = req.params;
    const category = await Category.find({ artistId });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Error fetching category",
      error: (error as Error).message,
    });
  }
};

// Create category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artistId } = req.params;
    const { name, description } = req.body;

    if (!name || !description || !artistId) {
      next({
        statusCode: 400,
        message: "Please fill in all the required fields",
      });
    }

    const imageUploadResult: any = await uploadToCloudinary(req.file);
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
      error: (error as Error).message,
    });
  }
};

// Update category
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    const imageUploadResult: any = await uploadToCloudinary(req.file);

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
      error: (error as Error).message,
    });
  }
};

// Delete category
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      error: (error as Error).message,
    });
  }
};

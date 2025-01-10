import Product from "../models/product.model.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.config.js";
import Category from "../models/category.model.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all products!",
      data: products,
    });
  } catch (error) {
    console.log("Error fetching products", error);
    next({
      statusCode: 500,
      message: "An error occured while deleting the product ",
      error: error.message,
    });
  }
};

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { name, price, category, stock } = req.body;

    if (!name || !price || !category || !artistId) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }

    const imageUploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file))
    );

    const images = imageUploads.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    const newProduct = new Product({
      artistId,
      name,
      price,
      category,
      stock,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Successfully created",
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 500,
      message: "An error occured while creating the product ",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, price, category, stock } = req.body;

    if (!name || !price || !category || !productId) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }

    if (req.files.length > 0) {
      const imageUploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file))
      );

      const images = imageUploads.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
    }
    const product = await Product.findByIdAndUpdate(productId);
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "An error occured while deleting the product ",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    product.deleteImages();
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "An error occured while deleting the product ",
      error: error.message,
    });
  }
};

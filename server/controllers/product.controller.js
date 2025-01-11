import Product from "../models/product.model.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.config.js";

// Get all products
exports.getAllProducts = async (req, res, next) => {
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
    const { name, price, category } = req.body;

    if (!name || !price || !category || !artistId) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 500,
      message: "An error occured while deleting the product ",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { artistId, productId } = req.params;
    const { name, price, category } = req.body;

    if (!name || !price || !category || !artistId || !productId) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }
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
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "An error occured while deleting the product ",
      error: error.message,
    });
  }
};

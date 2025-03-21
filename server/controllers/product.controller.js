import Product from "../models/product.model.js";
import cloudinary, {
  uploadToCloudinary,
  removeFromCloudinary,
  uploadCloudinary,
} from "../config/cloudinary.config.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("artistId").exec();
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

// Get all products based on user Id
export const getProductsByArtist = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    const products = await Product.find({ artistId })
      .populate("artistId")
      .exec();

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

// Get single product
export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched product!",
      data: product,
    });
  } catch (error) {
    console.log("Error fetching product", error);
    next({
      statusCode: 500,
      message: "An error occured while fetching the product ",
      error: error.message,
    });
  }
};

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { name, price, category, stock } = req.body;

    if (!name || !price || !category || !artistId || !stock) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }

    const image = req.file;
    const imageUpload = await uploadToCloudinary(image);

    const newProduct = new Product({
      artistId,
      name,
      price,
      category,
      stock,
      image: {
        public_id: imageUpload.public_id,
        url: imageUpload.secure_url,
      },
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Successfully created",
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
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

    console.log(req.body);
    console.log(req.params);
    if (!name || !price || !category || !productId || !stock) {
      return next({
        statusCode: 400,
        message: "Please provide all the fields",
      });
    }

    if (req.file) {
      const product = await Product.findById(productId);
      if (product.image?.public_id) {
        await removeFromCloudinary(product.image.public_id);
      }
      const image = req.file;
      const imageUpload = await uploadCloudinary(image, "products");

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          category,
          stock,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          category,
          stock,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
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
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    // Remove from Cloudinary if image exists
    if (product.image?.public_id) {
      await removeFromCloudinary(product.image.public_id);
    }

    // Delete product from database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    next({
      statusCode: 500,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};

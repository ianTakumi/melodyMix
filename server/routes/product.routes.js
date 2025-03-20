import express from "express";
import {
  getAllProducts,
  getProduct,
  getProductsByArtist,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get all products based on user Id
router.get("/:artistId", getProductsByArtist);

// Get single product
router.get("/single/:productId", getProduct);

// Create product
router.post("/:artistId", upload.single("image"), createProduct);

// Update product
router.put("/:productId", upload.single("image"), updateProduct);

// Delete product
router.delete("/:productId", deleteProduct);

export default router;

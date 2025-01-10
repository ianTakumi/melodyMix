import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Create product
router.post("/:artistId", upload.array("images"), createProduct);

// Update product
router.put("/:productId", updateProduct);

// Delete product
router.delete("/:productId", deleteProduct);

export default router;

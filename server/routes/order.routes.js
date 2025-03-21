import express from "express";
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  getAllOrdersForUser,
} from "../controllers/order.controller.js";

const router = express.Router();

// Get all orders
router.get("/:artistId", getAllOrders);

// Get all orders for a user
router.get("/user/:userId", getAllOrdersForUser);

// Get single order
router.get("/single/:orderId", getOrder);

// Create order
router.post("/", createOrder);

// Update order
router.put("/:orderId", updateOrder);

export default router;

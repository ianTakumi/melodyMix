import { Router } from "express";
import {
  getAllSubscription,
  createPaymentIntent,
  createSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller";

const router = Router();

// Get all subscriptions
router.get("/", getAllSubscription);

// Create payment intent
router.post("/:userId", createPaymentIntent);

// Create subscription
router.post("/createSubscription/:userId", createSubscription);

// Cancel subscription\
router.put("/cancelSubscription/:userId", cancelSubscription);

export default router;

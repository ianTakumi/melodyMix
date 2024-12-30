import { Router } from "express";
import {
  getAllSubscription,
  createPaymentIntent,
} from "../controllers/subscription.controller";

const router = Router();

// Get all subscriptions
router.get("/", getAllSubscription);

// Create subscription
router.post("/:userId", createPaymentIntent);

export default router;

import { Request, Response, NextFunction } from "express";
import Subscription from "../models/subscription.model";
import stripe from "../config/stripe.config";
import User from "../models/user.model";

// Get all subscriptions
export const getAllSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      message: "Fetched subscriptions successfully",
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving subscriptions",
      error: (error as Error).message,
    });
  }
};

// Create subscription
export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { amount, subscriptionType } = req.body;
    const user = await User.findById(userId);

    // Return if no user is found
    if (!user) {
      next({
        statusCode: 404,
        message: "User not found",
      });
      return;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: user.stripeCustomerId },
      { apiVersion: "2024-12-18.acacia" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "php",
      customer: user.stripeCustomerId,
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: user.stripeCustomerId,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    next({
      statusCode: 500,
      message: "An error occurred while creating subscription",
      error: (error as Error).message,
    });
  }
};

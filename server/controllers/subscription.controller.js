import Subscription from "../models/subscription.model.js";
import stripe from "../config/stripe.config.js";
import User from "../models/user.model.js";

// Get all subscriptions
export const getAllSubscription = async (req, res, next) => {
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
      error: error.message,
    });
  }
};

// Create payment intent
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount, subscriptionType } = req.body;
    console.log(req.body);
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
      amount: amount * 100,
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
      error: error.message,
    });
  }
};

// Create subscription
export const createSubscription = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { planType } = req.body;
    const user = await User.findById(userId);

    const start_date = new Date();
    const end_date = new Date(start_date);

    switch (planType) {
      case "Mini":
        end_date.setDate(end_date.getDate() + 7);
        break;
      default:
        end_date.setMonth(end_date.getMonth() + 2);
    }

    const subscription = new Subscription({
      userId,
      planType,
      start_date,
      end_date,
    });

    await subscription.save();
    res.status(201).json({
      success: true,
      data: subscription,
      message: "Subscription created successfully",
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving subscriptions",
      error: error.message,
    });
  }
};

// Cancel subscription
export const cancelSubscription = async (req, res, next) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      next({
        statusCode: 404,
        message: "Subscription not found",
      });
      return;
    }

    subscription.status = "Cancelled";
    await subscription.save();
    res
      .status(200)
      .json({ success: true, message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    next({
      statusCode: 500,
      message: "An error occurred while cancelling subscription",
      error: error.message,
    });
  }
};

import { Request, Response, NextFunction } from "express";
import Subscription from "../models/subscription.model";
import Song from "../models/song.model";

// Get all subscriptions
export const getAllSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find();
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving subscriptions",
      error: (error as Error).message,
    });
  }
};

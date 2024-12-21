import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all users!",
      data: users,
    });
  } catch (error) {
    console.log("Error fetching users", error);
    next(error);
  }
};

// Update profile
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { name, email, phoneNumber, dob, gender } = req.body;

    const data = { name, email, phoneNumber, dob, gender };

    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
      return next({ statusCode: 400, message: "User not found" });
    }
    // res.status(200).json({ message: "Received" });

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log("Error updating user profile", error);
    next({
      statusCode: 500,
      message: "Update profile unsuccessful",
      error: (error as Error).message,
    });
  }
};

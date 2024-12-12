import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

// Get all users
exports.getAllUsers = async (
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

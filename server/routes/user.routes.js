import express from "express";
import {
  getAllUsers,
  updateUserProfile,
  updateExpoPushToken,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Update profile details
router.put("/:userId", updateUserProfile);

// Update expo push token
router.post("/update-token", updateExpoPushToken);

export default router;

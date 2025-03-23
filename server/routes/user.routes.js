import express from "express";
import {
  getAllUsers,
  updateUserProfile,
  updateExpoPushToken,
  updateProfilePicture,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Update expo push token
router.post("/update-token", updateExpoPushToken);

// Update profile details
router.put("/:userId", updateUserProfile);

// Update profile picture
router.put(
  "/updateProfilePicture/:userId",
  upload.single("profilePicture"),
  updateProfilePicture
);

export default router;

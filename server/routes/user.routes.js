import express from "express";
import {
  getAllUsers,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Update profile details
router.put("/:userId", updateUserProfile);

export default router;

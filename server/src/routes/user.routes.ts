import { Router, Request, Response } from "express";
const router = Router();
import { getAllUsers, updateUserProfile } from "../controllers/user.controller";

// Get all users
router.get("/", getAllUsers);

// Update profile details
router.put("/:userId", updateUserProfile);

export default router;

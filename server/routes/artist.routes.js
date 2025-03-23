import express from "express";
import {
  getAllArtist,
  getNumberOfArtist,
  updateProfilePicture,
} from "../controllers/artist.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Get all artist
router.get("/", getAllArtist);

// Get total number of artist
router.get("/count", getNumberOfArtist);

// Update profile picture of artist
router.put(
  "/updateProfilePicture/:artistId",
  upload.single("profilePicture"),
  updateProfilePicture
);

export default router;

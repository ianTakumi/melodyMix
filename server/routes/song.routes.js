import express from "express";
import {
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/song.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Create a song
router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "mp3File", maxCount: 1 },
  ]),
  createSong
);

// Update a song
router.put("/update/:songId", updateSong);

// Delete a song
router.delete("/delete/:songId", deleteSong);

export default router;

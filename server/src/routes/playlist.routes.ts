import { Router } from "express";
import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller";

const router = Router();

// Get all playlist by userID
router.get("/:userId", getAllPlaylist);

// Create new playlist
router.post("/:userId", createPlaylist);

// Update playist
router.put("/:playlistId", updatePlaylist);

// Delete a playlist
router.delete("/:playlistId", deletePlaylist);

export default router;

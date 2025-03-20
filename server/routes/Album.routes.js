import express from "express";
import {
  getAllAlbumsBasedOnArtistId,
  getSingleAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/Album.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// Get all albums based on artist id
router.get("/:artistId", getAllAlbumsBasedOnArtistId);

// Get single album by ID
router.get("/single/:albumId", getSingleAlbumById);

// Add an album
router.post("/", upload.single("cover"), createAlbum);

// Update an album
router.put("/:albumId", upload.single("cover"), updateAlbum);

// Delete an album
router.delete("/:albumId", deleteAlbum);

export default router;

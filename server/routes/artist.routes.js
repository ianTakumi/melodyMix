import express from "express";
import {
  getAllArtist,
  getNumberOfArtist,
} from "../controllers/artist.controller.js";

const router = express.Router();

// Get all artist
router.get("/", getAllArtist);

// Get total number of artist
router.get("/count", getNumberOfArtist);

export default router;

import express from "express";
import { getAllArtist } from "../controllers/artist.controller.js";

const router = express.Router();

router.get("/", getAllArtist);

export default router;

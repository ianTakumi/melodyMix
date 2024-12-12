import { Router } from "express";
import { getAllArtist, createArtist } from "../controllers/artist.controller";

const router = Router();

router.get("/", getAllArtist);
router.post("/signup", createArtist);

export default router;

import { Router, Request, Response } from "express";
const router = Router();
import { signup, registerArtist } from "../controllers/auth.controller";

router.post("/signup", signup);
router.post("/artistSignup", registerArtist);

export default router;

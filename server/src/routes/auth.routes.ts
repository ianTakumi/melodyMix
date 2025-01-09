import { Router, Request, Response } from "express";
const router = Router();
import { signup, registerArtist, login } from "../controllers/auth.controller";

// User signup
router.post("/signup", signup);

// Artist signup
router.post("/artistSignup", registerArtist);

// User, artist, and admin login
router.post("/login", login);

export default router;

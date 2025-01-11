import express from "express";
import {
  signup,
  registerArtist,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

// User signup
router.post("/signup", signup);

// Artist signup
router.post("/artistSignup", registerArtist);

// User, artist, and admin login
router.post("/login", login);

export default router;

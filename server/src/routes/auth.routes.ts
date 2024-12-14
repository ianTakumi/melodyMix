import { Router, Request, Response } from "express";
const router = Router();
import { signup, registerArtist, login } from "../controllers/auth.controller";

router.post("/signup", signup);
router.post("/artistSignup", registerArtist);
router.post("/login", login);

export default router;

import { Router, Request, Response } from "express";
const router = Router();
const UserController = require("../controllers/user.controller");

// Get all users
router.get("/", UserController.getAllUsers);

export default router;

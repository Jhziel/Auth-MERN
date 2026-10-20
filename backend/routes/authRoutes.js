import express from "express";
import { signUp, verifyEmail } from "../controller/authController.js";
const router = express.Router();

router.post("/", signUp);

router.post("/verify-email", verifyEmail);

export default router;

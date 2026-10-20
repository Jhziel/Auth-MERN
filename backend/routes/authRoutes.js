import express from "express";
import {
  login,
  logout,
  signUp,
  verifyEmail,
} from "../controller/authController.js";
const router = express.Router();

router.post("/", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;

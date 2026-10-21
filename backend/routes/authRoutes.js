import express from "express";
import {
  forgotPassword,
  resetPassword,
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
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

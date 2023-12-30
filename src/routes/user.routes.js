import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/check-user").post(getUser);

export default router;

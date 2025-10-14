import Router from "express";
import passport = require("passport");
import {
  handleSignInController,
  handleSignUpController,
} from "../controllers/authController";

const router = Router();

// auth  routes
router.post("/sign-up", handleSignUpController);
router.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  handleSignInController
);

export default router;

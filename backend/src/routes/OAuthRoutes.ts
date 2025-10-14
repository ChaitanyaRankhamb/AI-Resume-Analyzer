import { Router } from "express";
import passport from "passport";
import handleGooglePassportStatergyController from "../controllers/OAuthController";
import { handleSignInController } from "../controllers/authController";

const router = Router();

// 🔹 Route for Google Sign-Up (Account Creation)
router.get(
  "/google",
  passport.authenticate("google-sign-up", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google-sign-up", { failureRedirect: "/signup-failure", session: false }),
  handleGooglePassportStatergyController
);

// 🔹 Route for Google Sign-In (Login)
router.get(
  "/google/sign-in",
  passport.authenticate("google-sign-in", { scope: ["email", "profile"] })
);

router.get(
  "/google/sign-in/callback",
  passport.authenticate("google-sign-in", { failureRedirect: "/signin-failure", session: false }),
  handleSignInController
);

export default router;

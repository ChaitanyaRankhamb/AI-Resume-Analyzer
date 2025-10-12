import { Router } from "express";
import handleGooglePassportStatergyController from "../controllers/OAuthController";
const passport = require("passport");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback", handleGooglePassportStatergyController);

export default router;
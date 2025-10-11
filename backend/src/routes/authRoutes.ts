import Router from "express";
import { handleSignUpController } from "../controllers/authController";

const router = Router();

// auth  routes
router.post("/sign-up", handleSignUpController);

export default router;
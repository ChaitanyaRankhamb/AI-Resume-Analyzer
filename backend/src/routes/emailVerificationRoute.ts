import Router from "express";
import { handleCodeEmailVerificationController, handleResendVerificationController, handleSendEmailVerificationController } from "../controllers/emailVerificationController";


const router = Router();

router.post("/send", handleSendEmailVerificationController);
router.post("/verify", handleCodeEmailVerificationController);
router.post("/resendVerify", handleResendVerificationController);

export default router;
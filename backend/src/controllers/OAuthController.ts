// controllers/handleGooglePassportStrategyController.ts
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthService } from "../services/OAuthServices";

export interface userDataProps {
  googleProfile: any;
  googleAccessToken: string | null;
  googleRefreshToken: string | null;
}

export default async function handleGooglePassportStrategyController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData = req.user as userDataProps; // <- passport puts it here
    console.log(userData);

    if (!userData) {
      return res.redirect("http://localhost:3000/signup-failure");
    }

    const authService = new AuthService();
    const result = await authService.handleGoogleUser(userData);

    const email = result.user?.email;
    if (typeof result.redirectUrl === "string") {
      return res.redirect(result.redirectUrl);
    } else {
      return res.redirect(
        `http://localhost:3000/verifyCode?email=${encodeURIComponent(email ?? "")}`
      );
    }
  } catch (error) {
    console.error("Account creating with Google failed:", error);
    res.redirect("http://localhost:3000/signup-failure");
  }
}

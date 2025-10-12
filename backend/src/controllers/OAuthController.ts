// controllers/handleGooglePassportStrategyController.ts
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthService } from "../services/OAuthServices";

export interface userDataProps {
  googleProfile: any;
  googleAccessToken: string | null;
  googleRefreshToken: string | null;
}

export default function handleGooglePassportStrategyController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "google",
    { failureRedirect: "/signup-failure", session: false },
    async (err: any, userData: userDataProps) => {
      if (err || !userData) {
        return res.redirect(`http://localhost:3000/signup-failure`);
      }

      try {
        const authService = new AuthService();
        const result = await authService.handleGoogleUser(userData);

        const email = result.user?.email;

        if (typeof result.redirectUrl === "string") {
          res.redirect(result.redirectUrl);
        } else {
          res.redirect(
            `http://localhost:3000/verifyCode?email=${encodeURIComponent(
              email ?? ""
            )}`
          );
        }
      } catch (error) {
        console.error("Account creating with Google failed:", error);
        res.redirect(`http://localhost:3000/signup-failure`);
      }
    }
  )(req, res, next);
}

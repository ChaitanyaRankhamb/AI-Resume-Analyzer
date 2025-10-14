// config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  "google-sign-up",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log("✅ Google OAuth callback triggered");
        console.log("Access Token:", _accessToken ? "received" : "missing");
        console.log("Profile:", profile?.id ? profile.id : "no profile received");

        if (!profile?.id) {
          console.error("❌ Google profile missing");
          return done(null, false);
        }

        const userData = {
          googleProfile: profile,
          googleAccessToken: _accessToken,
          googleRefreshToken: _refreshToken,
        };

        console.log("✅ Google userData prepared:", userData.googleProfile.displayName);
        return done(null, userData);
      } catch (error) {
        console.error("❌ Error in GoogleStrategy:", error);
        return done(error);
      }
    }
  )
);

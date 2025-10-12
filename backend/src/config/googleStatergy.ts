// config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const userData = {
          googleProfile: profile,
          googleAccessToken: _accessToken,
          googleRefreshToken: _refreshToken,
        };

        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

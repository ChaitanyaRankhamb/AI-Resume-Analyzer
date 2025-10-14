import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { signJwtToken } from "../lib/jwt";
import { UserRepositoryMongo } from "../repositories/mongo/User";
import { comparePassword } from "../lib/bcrypt";

const userRepository = new UserRepositoryMongo();

// Local strategy for credentials login
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await userRepository.findUserByEmail(email);
        if (
          !user ||
          typeof user.password !== "string" ||
          !(await comparePassword(password, user.password))
        ) {
          return done(null, false, { message: "Invalid credentials" });
        }

        if (!user || !user._id || !user.email || !user.username) {
          return done(null, false, {
            message: "User not found or missing required fields",
          });
        }

        // Custom callback logic
        const token = signJwtToken({
          id: user._id,
          email: user.email,
          username: user.username,
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google strategy
passport.use(
  "google-sign-in",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:4000/auth/google/sign-in/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await userRepository.findUserByGoogleId(profile.id);

        // Same callback logic for Google
        if (!user || !user._id || !user.email || !user.username) {
          return done(null, false, {
            message: "User not found or missing required fields",
          });
        }
        const token = signJwtToken({
          id: user._id,
          email: user.email,
          username: user.username,
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;

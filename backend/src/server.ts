import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";
import authRoutes from "./routes/authRoutes";
import OAuthRoutes from "./routes/OAuthRoutes"
import verifyEmailRoutes from "./routes/emailVerificationRoute";
import { connectDB } from "./config/databast";
import passport from "passport";
import cookie_parser from "cookie-parser";

import "./config/googleStatergy"
import "./config/loginPassport"

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Configure CORS to allow credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(cookie_parser());

//  Mount your normal API routes
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth/email", verifyEmailRoutes);
app.use("/auth", OAuthRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

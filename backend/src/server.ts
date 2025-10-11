import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";
import authRoutes from "./routes/authRoutes";
import verifyEmailRoutes from "./routes/emailVerificationRoute";
import { connectDB } from "./config/databast";

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

//  Mount your normal API routes
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth/email", verifyEmailRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

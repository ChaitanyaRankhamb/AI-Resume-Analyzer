import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("MongoDB connection string is missing in .env file");
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      // optional settings for stability
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1); // Stop the app if DB fails
  }
};

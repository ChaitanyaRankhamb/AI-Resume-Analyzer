import z from "zod";
import mongoose, { Document, model } from "mongoose";
import type { Model } from "mongoose";

// Make password optional, but if present, must be at least 6 characters
export const UserValidation = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6).optional().or(z.literal("")).or(z.undefined()),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]).optional(),
  isVerified: z.boolean(),
  verifyCode: z.number(),
  isExpiried: z.date(),
  resumes: z.array(z.string()),
  googleId: z.string().optional().or(z.null()),
  googleAccessToken: z.string().optional().or(z.null()),
  googleRefreshToken: z.string().optional().or(z.null()),
});

export interface UserType extends Document {
  username: string;
  password?: string; // Make password optional in type as well
  email: string;
  role?: "user" | "admin";
  isVerified: boolean;
  verifyCode: number;
  isExpiried: Date;
  resumes: string[];
  googleId?: string | null;
  googleAccessToken?: string | null;
  googleRefreshToken?: string | null;
}

const userSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: false, // Make it not required in schema
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: Number,
    },
    isExpiried: {
      type: Date,
    },
    resumes: [
      {
        type: String,
      },
    ],
    googleId: {
      type: String,
      default: null,
    },
    googleAccessToken: {
      type: String,
      default: null,
    },
    googleRefreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<UserType> =
  (mongoose.models.User as Model<UserType>) ||
  model<UserType>("User", userSchema);

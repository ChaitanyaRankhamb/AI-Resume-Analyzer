import { date } from './../../../frontend/node_modules/zod/src/v4/core/regexes';
import z from "zod";
import mongoose, { Document, model } from "mongoose";
import type { Model } from "mongoose";

export const UserValidation = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]).optional(),
  isVerified: z.boolean(),
  verifyCode: z.number(),
  isExpiried: z.date(),
  resumes: z.array(z.string()),
});

export interface UserType extends Document {
  username: string;
  password: string;
  email: string;
  role?: "user" | "admin";
  isVerified: boolean;
  verifyCode: number;
  isExpiried: Date;
  resumes: string[];
}

const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
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
},{
  timestamps: true,
});

export const UserModel: Model<UserType> =
  (mongoose.models.User as Model<UserType>) || model<UserType>("User", userSchema)

import { ObjectId } from './../../node_modules/bson/src/objectid';
// src/entities/User.ts
import { Types } from "mongoose";

export const USER_ROLES = ["user", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  _id?: string | null | Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  isVerified?: boolean;
  verifyCode?: number | null;
  isExpiried?: Date | null;
  resumes?: string[];
}

export class User implements IUser {
  _id: string | null;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  verifyCode: number | null;
  isExpiried: Date | null;
  resumes: string[];

  constructor(user: Partial<IUser> = {}) {
    this._id = typeof user._id === "string" || user._id == null
      ? user._id ?? null
      : user._id.toString();
    this.username = user.username ?? "";
    this.email = user.email ?? "";
    this.password = user.password ?? "";
    this.role = user.role ?? "user";
    this.isVerified = user.isVerified ?? false;
    this.verifyCode = user.verifyCode ?? null;
    this.isExpiried = user.isExpiried ?? null;
    this.resumes = user.resumes ?? [];
  }

  public isAdmin(): boolean {
    return this.role === "admin";
  }
}

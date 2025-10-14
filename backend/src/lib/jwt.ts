import jwt from "jsonwebtoken";

interface payloadDataProps {
  id: string;
  email: string;
  username: string;
}

interface sessionProps {
  user: User;
  token: string;
  expiresAt: Date;
}

export async function signJwtToken(payload: payloadDataProps) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyJwtToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

import { Response } from "express";
import { User } from "../entities/User";

export const storeSessionService = (res: Response, session: sessionProps) => {
  res.cookie("session", JSON.stringify(session), {
    httpOnly: true,
    secure: true, // set true if HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const storeTokenService = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
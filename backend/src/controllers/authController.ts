import { Request, Response } from "express";
import { UserRepositoryMongo } from "../repositories/mongo/User";
import { UserServices } from "../services/authServices";
import { User } from "../entities/User";
import passport = require("passport");
import { UserLoginServices } from "../services/loginAuthServices";
import {
  signJwtToken,
  storeSessionService,
  storeTokenService,
} from "../lib/jwt";

const userRepository = new UserRepositoryMongo();
const userServices = new UserServices(userRepository);
const userLoginServices = new UserLoginServices(userRepository);

export async function handleSignUpController(req: Request, res: Response) {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(404).json({
      success: false,
      message: "No data provided",
      status: 404,
    });
  }

  // Create a User instance from data
  const user = new User({
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role,
    isVerified: data.isVerified,
    verifyCode: data.verifyCode,
    isExpiried: data.isExpiried,
    resumes: data.resumes,
  });

  try {
    const result = await userServices.register(user);

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Account created successfully!",
        status: 201,
        user: result.user,
      });
    } else {
      // Do not treat as a server error, just respond
      return res.status(400).json({
        success: false,
        message: result.message,
        status: 400,
      });
    }
  } catch (error: any) {
    // Truly unexpected/internal errors only fall here now
    console.error("Internal server error ", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Error in creating user account",
      status: 500,
    });
  }
}

export async function handleSignInController(req: Request, res: Response) {
  const passportUser = req.user as any;
  const actualUser = passportUser.user; // unwrap
  const token = passportUser.token;

  if (!actualUser) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      status: 401,
    });
  }

  try {
    const jwtPayload = {
      id: (actualUser as any)._id,
      username: (actualUser as any).username,
      email: (actualUser as any).email,
    };

    const token = await signJwtToken(jwtPayload);

    // Pass only the safe user object to the login service
    const result = await userLoginServices.login({ user: actualUser, token });

    if (result && result.user && result.token) {
      storeTokenService(res, result.token);
      storeSessionService(res, result.session);

      return res.redirect(
        `http://localhost:3000/home?email=${encodeURIComponent(actualUser.email)}`
      );
    } else {
      return res.redirect("/signin-failure");
    }
  } catch (error: any) {
    console.error("Sign-in error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error during login",
      status: 500,
    });
  }
}

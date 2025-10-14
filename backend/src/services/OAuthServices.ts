import { UserRepositoryMongo } from "../repositories/mongo/User";
import { userDataProps } from "../controllers/OAuthController";
import verifyCode from "../lib/verifyCode";
import expiryDate from "../lib/expiryDate";
import { User } from "../entities/User";
import { generateUniqueUsername } from "../lib/generateUniqueUsername";

export class AuthService {
  private userRepository: UserRepositoryMongo;

  constructor() {
    this.userRepository = new UserRepositoryMongo();
  }

  async handleGoogleUser(userData: userDataProps) {
    const { googleProfile, googleAccessToken, googleRefreshToken } = userData;
    const profile = googleProfile;
    const accessToken = googleAccessToken;
    const refreshToken = googleRefreshToken;
    const code = verifyCode();
    const expDate = expiryDate();

    if (!profile) {
      return { success: false, message: "Google profile not found", status: 404 };
    }

    const googleId = profile.id;
    const email = profile.emails?.[0]?.value;
    let name = profile.displayName || email?.split("@")[0];

    name = await generateUniqueUsername(name);

    if (!email) {
      return { success: false, message: "Email not found in Google profile", status: 400 };
    }

    // Case 1: Existing user by Google ID
    const existingByGoogleId = await this.userRepository.findUserByGoogleId(googleId);
    if (existingByGoogleId) {
      existingByGoogleId.googleAccessToken = accessToken;
      existingByGoogleId.googleRefreshToken = refreshToken;
      await this.userRepository.updateUser(existingByGoogleId);
      return { success: true, redirectUrl: "/dashboard", message: "Welcome back!" };
    }

    // Case 2: Existing user by email
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      if (existingUser.isVerified) {
        existingUser.googleId = googleId;
        existingUser.googleAccessToken = accessToken;
        existingUser.googleRefreshToken = refreshToken;
        await this.userRepository.updateUser(existingUser);
        return { success: true, redirectUrl: "/dashboard", message: "Google linked successfully!" };
      } else {
        existingUser.verifyCode = code;
        existingUser.isExpiried = expDate;
        await this.userRepository.updateUser(existingUser);

        await this.sendVerificationEmail(email, code);
        return { success: true, redirectUrl: `http://localhost:3000/verifyCode?email=${encodeURIComponent(email)}` };
      }
    }

    // Case 3: New user
    const newUser = new User({
      username: name,
      email,
      googleId,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken,
      isVerified: false,
      verifyCode: code,
      isExpiried: expDate,
      role: "user",
      resumes: [],
    });

    const createdUser = await this.userRepository.createUser(newUser);
    await this.sendVerificationEmail(email, code);

    return {
      success: true,
      redirectUrl: `http://localhost:3000/verifyCode?email=${encodeURIComponent(email)}`,
      user: createdUser,
    };
  }

  private async sendVerificationEmail(email: string, code: number) {
    try {
      await fetch("http://localhost:4000/api/auth/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
    } catch (err) {
      console.error("Email sending failed:", err);
    }
  }
}

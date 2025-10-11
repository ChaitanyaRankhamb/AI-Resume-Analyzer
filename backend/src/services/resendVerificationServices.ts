import expiryDate from "../lib/expiryDate";
import verifyCode from "../lib/verifyCode";
import { UserRepositoryMongo } from "../repositories/mongo/User";

interface ResendVerifyDataProps {
  email: string;
}

const userRepository = new UserRepositoryMongo();

export default async function resendVerificationService(
  data: ResendVerifyDataProps
) {
  const { email } = data;

  // Validate email
  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "Invalid email",
      status: 400,
    };
  }

  try {
    // Find the user who is not yet verified
    const existingUser = await userRepository.findUserByEmail(email, false);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found or already verified.",
        status: 404,
      };
    }

    // Generate new verification code and expiry
    existingUser.verifyCode = verifyCode();
    existingUser.isExpiried = expiryDate();

    // Update user in DB
    const updatedUser = await userRepository.updateUser(existingUser);

    // Send verification email
    const emailPayload = {
      email: updatedUser.email,
      code: updatedUser.verifyCode,
    };

    await fetch("http://localhost:4000/api/auth/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    }).catch((err) => {
      console.error("Failed to send verification email:", err);
    });

    return {
      success: true,
      user: updatedUser,
      message: "Verification code resent successfully.",
      status: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to resend verification code.",
      status: 500,
    };
  }
}

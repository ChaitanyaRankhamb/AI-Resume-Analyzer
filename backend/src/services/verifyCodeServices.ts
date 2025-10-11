import { UserRepositoryMongo } from '../repositories/mongo/User';
interface verifyEmailDataProps {
  code: number;
  email: string;
}

// Checks if the code matches user's verifyCode in DB by email
export async function verifyCodeService( { data }: { data: verifyEmailDataProps }) {
  try {
    const { code, email } = data;

    const userRepositories = new UserRepositoryMongo();
    // Find the user with the email from the database
    const user = await userRepositories.findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "User not found with this email",
        status: 404,
      };
    }
    // Check if the verification code is expired
    if (!user.isExpiried || new Date(user.isExpiried).getTime() < Date.now()) {
      return {
        success: false,
        message: "Verification code has expired.",
        status: 400,
      };
    }


    // Check if the user's verifyCode matches the provided code
    if (String(user.verifyCode) === String(code)) {
      // Mark user as verified
      user.isVerified = true;
      // Optionally clear verifyCode and expiry, up to project policy
      user.verifyCode = null;
      user.isExpiried = null;

      // Update user in DB
      const updatedUser = await userRepositories.updateUser(user);

      if (!updatedUser) {
        return {
          success: false,
          message: "User not updated after verification, try again.",
          status: 400,
        }
      }
      return {
        success: true,
        message: "Verification code matched successfully.",
        status: 200,
      };
    } else {
      return {
        success: false,
        message: "Invalid or expired verification code.",
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An error occurred while verifying code",
      status: 500,
    };
  }
}
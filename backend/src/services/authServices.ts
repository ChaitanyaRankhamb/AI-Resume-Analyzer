import { User } from "../entities/User";
import { hashPassword } from "../lib/bcrypt";
import expiryDate from "../lib/expiryDate";
import verifyCode from "../lib/verifyCode";
import { UserRepositories } from "../repositories/UserRepositories";

type RegisterResult =
  | { success: true; user: User; message: string }
  | { success: false; message: string };

export class UserServices {
  constructor(private userRepositories: UserRepositories) {}

  // user sign up service logic
  async register(userdata: User): Promise<RegisterResult> {
    try {
      // Check if the username already exists (only if email doesn't exist)
      const userExistByUsername =
        await this.userRepositories.findUserByUsername(userdata.username);

      const userExistByEmail = await this.userRepositories.findUserByEmail(
        userdata.email
      );

      if (userExistByUsername && !userExistByEmail) {
        return {
          success: false,
          message: "User already exists with this username",
        };
      }

      // Case 1: User found by email (regardless of username)
      if (userExistByEmail) {
        if (userExistByEmail.isVerified) {
          // If already verified, show error
          return {
            success: false,
            message: "User already exists with Credentials",
          };
        } else if (
          userExistByEmail.username === userdata.username &&
          userExistByEmail.email === userdata.email
        ) {
          // Case 2: Both username and email match, but user not verified
          const hashedPassword = await hashPassword(userdata.password);
          const newVerifyCode = verifyCode();
          const newExpiryDate = expiryDate();

          userExistByEmail.password = hashedPassword;
          userExistByEmail.verifyCode = newVerifyCode;
          userExistByEmail.isExpiried = newExpiryDate;
          userExistByEmail.username = userdata.username;
          userExistByEmail.email = userdata.email;
          userExistByEmail.role = userdata.role || userExistByEmail.role;

          await this.userRepositories.updateUser(userExistByEmail);

          const emailPayload = {
            email: userExistByEmail.email,
            code: userExistByEmail.verifyCode,
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
            user: userExistByEmail,
            message: "User updated and verification code resent to your email",
          };
        } else {
          // Email exists, username different, and user not verified.
          const hashedPassword = await hashPassword(userdata.password);
          const newVerifyCode = verifyCode();
          const newExpiryDate = expiryDate();

          userExistByEmail.password = hashedPassword;
          userExistByEmail.verifyCode = newVerifyCode;
          userExistByEmail.isExpiried = newExpiryDate;
          userExistByEmail.username = userdata.username;
          userExistByEmail.role = userdata.role || userExistByEmail.role;

          await this.userRepositories.updateUser(userExistByEmail);

          const emailPayload = {
            email: userExistByEmail.email,
            code: userExistByEmail.verifyCode,
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
            user: userExistByEmail,
            message: "User updated and verification code resent to your email",
          };
        }
      }

      // Create new user if neither email nor username is taken
      const hashedPassword = await hashPassword(userdata.password);
      const newVerifyCode = verifyCode();
      const newExpiryDate = expiryDate();

      const newUser = new User({
        ...userdata,
        password: hashedPassword,
        verifyCode: newVerifyCode,
        isExpiried: newExpiryDate,
      });

      const createdUser = await this.userRepositories.createUser(newUser);

      // Send verification email to new user
      const emailPayload = {
        email: createdUser.email,
        code: createdUser.verifyCode,
      };

      await fetch("http://localhost:4000/api/auth/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      }).catch((err) => {
        console.error("Failed to send verification email:", err);
      });

      return {
        success: true,
        user: createdUser,
        message: "User created successfully",
      };
    } catch (error: any) {
      const errorMessage =
        error?.message || "Error occurred during registration";
      return { success: false, message: errorMessage };
    }
  }
}

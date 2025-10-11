import { Request, Response } from "express";
import { emailSendService } from "../services/emailVerifyServices";
import { verifyCodeService } from "../services/verifyCodeServices";
import resendVerificationService from "../services/resendVerificationServices";

interface SendEmailDataProps {
  email: string;
  code: number;
}

interface verifyEmailDataProps {
  code: number;
  email: string;
}

interface resendVerifyDataProps {
  email: string;
}

export async function handleSendEmailVerificationController(
  req: Request<{}, {}, SendEmailDataProps>, // Correct typing for request body
  res: Response
) {
  try {
    const emailData = req.body;

    if (!emailData || !emailData.email || !emailData.code) {
      return res.json({
        success: false,
        message: "Email and code are required!",
        status: 400,
      });
    }
    const result = await emailSendService(emailData);

    return res.json({
      success: true,
      message: "Verification email sent",
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error(
      "Internal server error while sending email. Please try again.",
      error
    );
    return res.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleCodeEmailVerificationController(
  req: Request<{}, {}, verifyEmailDataProps>,
  res: Response
) {
  try {
    const data = req.body;

    if (!data) {
      return res.json({
        success: false,
        message: "Verification code is required!",
        status: 400,
      });
    }

    // Call your code verification service with the correct argument structure
    const result = await verifyCodeService( { data });
    console.log(result.message);
    

    return res.json({
      success: result.success,
      message: result.message,
      status: result.status,
    });
  } catch (error) {
    console.error("Internal server error while verifying code.", error);
    return res.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleResendVerificationController(
  req: Request<{}, {}, resendVerifyDataProps>,
  res: Response
) {
  try {
    const data = req.body;

    if (!data || !data.email) {
      return res.json({
        success: false,
        message: "Email is required to resend verification code!",
        status: 400,
      });
    }

    // Call the resend verification service
    const result = await resendVerificationService({ email: data.email });

    if (result.success) {
      return res.json({
        success: true,
        message: result.message,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: result.message || "Failed to resend verification code.",
        status: result.status || 400,
      });
    }
  } catch (error) {
    console.error("Internal server error while resending verification code.", error);
    return res.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}

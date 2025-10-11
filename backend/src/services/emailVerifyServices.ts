import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_xxxxxxxxx");

interface EmailDataProps {
  email: string;
  code: number;
}

export async function emailSendService(emailData: EmailDataProps) {
  try {
    const { email, code } = emailData;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Your Verification Code",
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    if (error) {
      // Return error object for controller to handle
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

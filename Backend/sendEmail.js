import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendResetEmail = async (to, token) => {
  const resetUrl = `${process.env.SENDER_URL}/reset-password/${token}`;
  const msg = {
    to: to,
    from: `${process.env.SENDER_EMAIL}`,
    subject: "Password Reset Request",
    html: `
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset it:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Reset email sent to:", to);
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error("Email could not be sent");
  }
};

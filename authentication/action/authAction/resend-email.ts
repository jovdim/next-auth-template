"use server"

import { generateVerificationToken } from "@/authentication/lib/generate-token";
import { sendVerificationEmail } from "@/authentication/lib/mail";

export default async function resendEmail({ email }: { email: string }) {
  if (!email) {
    throw new Error("Email is required for resending the verification email.");
  }

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  console.log("Verification email sent successfully!");
}

"use server";

import delayRandom from "@/authentication/lib/delay-random";
import {
  ResetEmailSchema,
  ResetSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { getUserByEmail } from "@/authentication/lib/data/user";
import { generatePasswordResetToken } from "@/authentication/lib/generate-token";
import { sendPasswordResetEmail } from "@/authentication/lib/mail";

export async function resetPassword(data: ResetSchemaForm) {
  const {
    success,
    error,
    data: validatedData,
  } = ResetEmailSchema.safeParse(data);

  if (!success) {
    //rate limiting not implemented yet.
    await delayRandom(2000, 4000);
    console.warn("Email validation failed:", error.format());
    return { error: "Invalid email address." };
  }

  const { email } = validatedData;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    console.warn(`Attempt to reset non-existent email: ${email}`);
    return { error: "Email not found." };
  }

  // Generate a password reset token and send the reset email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Password reset email has been sent." };
}

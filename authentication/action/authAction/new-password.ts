"use server";

import delayRandom from "@/authentication/lib/delay-random";
import {
  NewPasswordSchema,
  NewPasswordSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { getUserByEmail } from "@/authentication/lib/data/user";
import { getPasswordResetTokenByToken } from "@/authentication/lib/data/password-reset-token";
import bcryptjs from "bcryptjs";
import db from "@/authentication/lib/db";

const SALT_ROUNDS = 10;

export default async function resetPassword(
  data: NewPasswordSchemaForm,
  token?: string | null,
) {
  if (!token) {
    return {
      error:
        "Reset token is missing. Please request a new password reset link.",
    };
  }

  // Validate input data using Zod schema
  const {
    success,
    error,
    data: validatedData,
  } = NewPasswordSchema.safeParse(data);

  if (!success) {
    // Apply delay to mitigate brute force attacks
    //rate limiting not implemented yet.
    await delayRandom(2000, 4000);
    console.warn("Password validation failed:", error.format());
    return { error: "Password does not meet security requirements." };
  }

  const { password } = validatedData;

  // Retrieve token from database and check its validity
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error:
        "The reset token is invalid. Please request a new password reset link.",
    };
  }

  const tokenHasExpired = new Date(existingToken.expiresAt) < new Date();
  if (tokenHasExpired) {
    return {
      error:
        "The reset token has expired. Please request a new password reset link.",
    };
  }

  // Retrieve user by the email associated with the reset token
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Account associated with this email does not exist." };
  }

  try {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user's password securely in the database
    await db.user.update({
      where: { email: existingUser.email },
      data: { password: hashedPassword },
    });

    // Remove the reset token from the database after successful use
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Your password has been successfully updated." };
  } catch (err) {
    console.error("Error updating password:", err);
    return {
      error:
        "An error occurred while updating your password. Please try again later.",
    };
  }
}

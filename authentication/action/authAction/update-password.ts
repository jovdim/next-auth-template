"use server";

import delayRandom from "@/authentication/lib/delay-random";
import {
  updatePasswordSchema,
  UpdatePasswordSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { getUserByEmail } from "@/authentication/lib/data/user";
import bcryptjs from "bcryptjs";
import db from "@/authentication/lib/db";
import { auth } from "@/auth";

const SALT_ROUNDS = 10;

export default async function updatePassword(data: UpdatePasswordSchemaForm) {
  const session = await auth();
  const userEmail = session?.user.email;

  // Validate input data using Zod schema
  const {
    success,
    error,
    data: validatedData,
  } = updatePasswordSchema.safeParse(data);

  const { currentPassword, password } = data;
  if (!success) {
    // Rate limiting or CAPTCHA would go here
    await delayRandom(2000, 4000);
    console.error("Password validation failed:", error.format());
    return { error: "Password does not meet security requirements." };
  }

  if (!userEmail) {
    return { error: "Email not found in session." };
  }

  const existingUser = await getUserByEmail(userEmail);
  if (!existingUser || !existingUser.password) {
    return { error: "User does not have set up credentials to log in!" };
  }

  // Validate current password
  const isPasswordValid = await bcryptjs.compare(
    currentPassword,
    existingUser.password,
  );
  if (!isPasswordValid) {
    return { error: "Invalid Password!" };
  }

  // Check if new password is the same as the old one
  const isSameOldPassword = currentPassword === password;

  console.log("Issame?: ", isSameOldPassword);
  if (isSameOldPassword) {
    return { error: "You can't use the same old password, please try again." };
  }

  try {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user's password securely in the database
    await db.user.update({
      where: { email: existingUser.email },
      data: { password: hashedPassword },
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

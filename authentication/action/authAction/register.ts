"use server";

import bcryptjs from "bcryptjs";
import {
  LoginSchema,
  RegisterSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import db from "@/authentication/lib/db";
import { getUserByEmail } from "@/authentication/lib/data/user";
import delayRandom from "@/authentication/lib/delay-random";
import { generateVerificationToken } from "@/authentication/lib/generate-token";
import { sendVerificationEmail } from "@/authentication/lib/mail";

const SALT_ROUNDS = 10;

export async function registerUser(data: RegisterSchemaForm) {
  // Validate input data against the LoginSchema
  const { success, error, data: validatedData } = LoginSchema.safeParse(data);

  if (!success) {
    // Apply delay to mitigate brute force attacks
    await delayRandom(2000, 4000);
    console.warn("User registration validation failed:", error.format());
    return { error: "Invalid input. Please check your details and try again." };
  }

  const { name, email, password } = validatedData;

  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  // Generate a unique hash for the password
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Create the user in the database
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate a verification token and send the confirmation email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "A confirmation email has been sent. Please verify your email.",
  };
}

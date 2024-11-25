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
import { redirect } from "next/navigation";
import { getVerificationTokenByEmail } from "@/authentication/lib/data/verification-token";

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

  const existingToken = await getVerificationTokenByEmail(email);
  const hasExpired = existingToken
    ? new Date(existingToken.expiresAt) < new Date()
    : "";
  if (
    !existingUser?.credentialEmailVerified &&
    existingUser?.password &&
    !hasExpired
  )
    return {
      success:
        "A confirmation email has already been sent. Please check your inbox or spam folder.",
    };

  if (existingUser?.password && existingUser?.credentialEmailVerified) {
    return { error: "An account with this email already exists." };
  }

  // Generate a unique hash for the password
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Create the user in the database
  await db.user.upsert({
    where: {
      email: existingUser?.email ?? "", // condition to chec  k if the user already exists
    },
    create: {
      name,
      email,
      password: hashedPassword, // fields to create if the user does not exist
    },
    update: {
      password: hashedPassword, // fields to update if the user exists
    },
  });

  // Generate a verification token and send the confirmation email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  redirect(`/auth/register/verify-email?email=${encodeURIComponent(email)}`);
}

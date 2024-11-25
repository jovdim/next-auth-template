"use server";

import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import delayRandom from "@/authentication/lib/delay-random";
import { LoginSchemaForm } from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/authentication/lib/data/user";
import { getVerificationTokenByEmail } from "@/authentication/lib/data/verification-token";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "@/authentication/lib/mail";
import { generateVerificationToken } from "@/authentication/lib/generate-token";

export async function loginUser(data: LoginSchemaForm) {
  // Validate input data using Zod schema
  const {
    success,
    error,
    data: validatedData,
  } = LoginSchemaForm.safeParse(data);

  if (!success) {
    // Artificial delay to mitigate brute force attacks
    // rate limiting now implemented yet
    await delayRandom(2000, 4000);
    console.warn("Validation failed:", error.format());
    return { error: "Invalid email or password!" };
  }

  const { email, password } = validatedData;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    await delayRandom(2000, 4000);
    return { error: "Invalid email or password!" };
  }
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

  if (hasExpired) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    redirect(`/auth/register/verify-email?email=${encodeURIComponent(email)}`);
  }

  const isPasswordValid = await bcryptjs.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    await delayRandom(2000, 4000);
    console.warn("Incorrect password attempt.");
    return { error: "Invalid email or password!" };
  }
  try {
    await signIn("credentials", {
      ...existingUser,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    // Return success message
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };
        case "AccessDenied":
          return { error: "Access Denied!" };
        default:
          return { error: "Something went wrong! Please try again." };
      }
    }
    throw error;
  }
}

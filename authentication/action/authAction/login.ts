"use server";

import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import delayRandom from "@/authentication/lib/delay-random";
import { LoginSchemaForm } from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/authentication/lib/data/user";

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

  if (!existingUser.credentialEmailVerified && existingUser.password) {
    return {
      success:
        "A confirmation email has already been sent. Please check your inbox or spam folder.",
    };
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

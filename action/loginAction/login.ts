"use server";

import { signIn } from "@/auth";
import db from "@/lib/db";
import {
  LoginSchemaForm,
  LoginSchemaWithoutVerification,
} from "@/lib/loginFormSchema/login-signin-types";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

export async function loginUser(data: LoginSchemaForm) {
  // Validate input data against the LoginSchema
  const validatedFields = LoginSchemaWithoutVerification.safeParse(data);
  // Check for validation errors
  if (!validatedFields.success) {
    await new Promise((resolve) => {
      // Generate a random duration between 2000 and 4000 milliseconds
      const timeoutDuration = Math.random() * (5000 - 2000) + 2000; // min 2 seconds, max 4 seconds
      setTimeout(
        // Resolve the promise after the timeout
        resolve,
        timeoutDuration,
      );
      console.log(timeoutDuration);
    });

    return { error: "Invalid credentials!" }; // Return validation errors
  }

  // Proceed with your login logic here, e.g., checking against a database
  console.log("Email:", validatedFields.data.email); // Safely log the validated email
  console.log("Password:", validatedFields.data.password);

  // Here you can add logic to authenticate the user, e.g., database check
  // ...

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  // Return success response
}

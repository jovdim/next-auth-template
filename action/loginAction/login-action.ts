"use server";

import {
  LoginSchema,
  LoginSchemaForm,
} from "@/lib/loginFormSchema/login-signin-types";

export async function handleLogInUser(data: LoginSchemaForm) {
  // Validate input data against the LoginSchema
  const result = LoginSchema.safeParse(data);

  // Check for validation errors
  if (!result.success) {
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
  console.log("Email:", result.data.email); // Safely log the validated email
  console.log("Password:", result.data.password);
  console.log("code: ", result.data.emailVerification); // Safely log the validated

  // Here you can add logic to authenticate the user, e.g., database check
  // ...

  return { success: "Authorized" }; // Return success response
}

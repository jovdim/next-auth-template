"use server";

import bcryptjs from "bcryptjs";
import {
  LoginSchema,
  RegisterSchemaForm,
} from "@/lib/loginFormSchema/login-signin-types";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/data/user";

const SALT_ROUNDS = 10;

export async function registerUser(data: RegisterSchemaForm) {
  // Validate input data against the LoginSchema
  const validatedFields = LoginSchema.safeParse(data);

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
  const { name, email, emailVerification, password } = validatedFields.data;

  //for every same user pasword different hashes
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);

  console.log("Name: ", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email); // Safely log the validated email
  console.log("Password:", hashedPassword);
  console.log("code: ", validatedFields.data.emailVerification);

  //db logic

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exists!" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO: SEND VERIFICATION TOKEN EMAIL

  return { success: "User Created!" }; // Return success response
}

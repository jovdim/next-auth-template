import * as z from "zod";

const blockedEmails = [
  "test@gmail.com",
  "fuck@gmail.com",
  "spam@example.com",
  "admin@example.com",
  "user@example.com",
  "info@example.com",
  "contact@example.com",
  "support@example.com",
  "noreply@example.com",
  "fake@gmail.com",
  "invalid@example.com",
  "username@gmail.com",
  "user123@gmail.com",
  "abc123@gmail.com",
  "test123@gmail.com",
  "qwerty123@gmail.com",
  "123456@gmail.com",
  "temp@gmail.com",
  "no-reply@gmail.com",
  "blah@gmail.com",
  "random@gmail.com",
  "admin123@gmail.com",
  "justin.bieber@gmail.com",
  "1234abcd@gmail.com",
  "username1@gmail.com",
  "newuser@gmail.com",
  "tryagain@gmail.com",
  "youremail@gmail.com",
  "example@gmail.com",
  "demo@gmail.com",
  "testaccount@gmail.com",
  "myemail@gmail.com",
  "xyz123@gmail.com",
  "hello@gmail.com",
  "webmaster@gmail.com",
  "abc@gmail.com",
  "fakeaddress@gmail.com",
  "test.test@gmail.com",
  "notarealemail@gmail.com",
  "wrong.email@gmail.com",
];

const commonPasswords = [
  "password",
  "123456",
  "123456789",
  "12345678",
  "12345",
  "qwerty",
  "abc123",
  "letmein",
  "welcome",
  "monkey",
  "admin",
  "iloveyou",
  "1234",
  "1q2w3e4r",
  "qwertyuiop",
  "123321",
  "123123",
  "sunshine",
  "princess",
  "dragon",
  "password1",
  "password123",
];

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email format." })
    .refine(
      (val) =>
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(val) &&
        !/^\d+@/.test(val),
      {
        message:
          "Invalid email address. Cannot start with a number or be unrealistic.",
      },
    )
    .refine(
      (val) => {
        const localPart = val.split("@")[0].toLowerCase();
        return (
          !blockedEmails.includes(val.toLowerCase()) &&
          !localPart.match(/^(test|fake|admin|spam|user|info|contact)/)
        );
      },
      { message: "Invalid email format." },
    ),

  password: z
    .string({ invalid_type_error: "cool" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must be at most 64 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character.",
    })
    .refine((val) => !/\s/.test(val), {
      message: "Password cannot contain spaces.",
    })
    .refine((val) => !commonPasswords.includes(val), {
      message: "Password is too common, please choose a different one.",
    }),

  emailVerification: z
    .string()
    // .min(6, { message: "Code must be 6 numbers." })
    .optional(),
});


// Create a new schema omitting emailVerification
export const LoginSchemaWithoutVerification = LoginSchema.omit({
  emailVerification: true,
});
// Infer the type without the emailVerification field
export type LoginSchemaForm = z.infer<typeof LoginSchemaWithoutVerification>;

export type SingupSchemaForm = z.infer<typeof LoginSchema>;


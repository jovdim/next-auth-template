import * as z from "zod";

// Blocked email addresses for spam and testing
const blockedEmails = [
  "test@gmail.com",
  "spam@example.com",
  "admin@example.com",
  "user@example.com",
  "info@example.com",
  "contact@example.com",
  "support@example.com",
  "noreply@example.com",
  "fake@gmail.com",
  "temp@gmail.com",
  "no-reply@gmail.com",
  "example@gmail.com",
  "demo@gmail.com",
  "sample@example.com",
  "newsletter@example.com",
  "hello@example.com",
  "service@example.com",
  "mail@example.com",
  "admin@domain.com",
  "office@example.com",
  "info@domain.com",
  "support@domain.com",
  "sales@domain.com",
  "billing@domain.com",
  "help@example.com",
  "account@example.com",
  "feedback@example.com",
  "inquiry@example.com",
  "test123@gmail.com",
  "do-not-reply@example.com",
  "webmaster@example.com",
  "marketing@example.com",
  "hello@domain.com",
  "business@example.com",
  "welcome@example.com",
  "nobody@example.com",
  "automated@example.com",
  "system@example.com",
  "notifications@example.com",
  "noreply@domain.com",
  "update@example.com",
  "accounting@example.com",
  "testuser@gmail.com",
  "someone@example.com",
  "anonymous@example.com",
  "default@example.com",
  "root@example.com",
  "management@example.com",
  "info@business.com",
  "contact@business.com",
  "enquiries@example.com",
  "accounts@example.com",
  "customer.service@example.com",
  "donotreply@example.com",
  "testemail@example.com",
  "reply@example.com",
  "bot@example.com",
  "noreply@company.com",
  "info@website.com",
  "webmaster@domain.com",
  "admin@website.com",
  "test@domain.com",
  "email@example.com",
  "general@example.com",
  "robot@example.com",
  "unsubscribe@example.com",
  "postmaster@example.com",
  "hello@business.com",
  "accounts@domain.com",
  "administrator@example.com",
  "sales@company.com",
  "hello@website.com",
  "system@company.com",
  "contact@domain.com",
  "no-reply@company.com",
];

// Helper function for password validation rules
const passwordValidation = (password: string, ctx: z.RefinementCtx) => {
  const errors = [];

  if (password.length < 12) errors.push("Min 12 chars");
  if (!/[A-Z]/.test(password)) errors.push("Uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Lowercase letter");
  if (!/\d/.test(password)) errors.push("Number");
  if (!/[@$!%*?&#]/.test(password)) errors.push("Special character (@$!%*?&#)");
  if (/\s/.test(password)) errors.push("No spaces");

  if (errors.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Password must contain: ${errors.join(", ")}.`,
      path: ["password"],
    });
  }
};

// Base schema with enhanced email and password validation
export const LoginSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(4, { message: "Min 4 characters" })
    .max(40, { message: "Max 40 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Letters/spaces only" }),

  email: z
    .string()
    .trim()
    .min(1, { message: "Email required" })
    .email({ message: "Invalid email" })
    .refine(
      (val) =>
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(val) &&
        !/^\d+@/.test(val),
      { message: "Must start with a letter; be realistic" },
    )
    .refine(
      (val) => {
        const localPart = val.split("@")[0].toLowerCase();
        return (
          !blockedEmails.includes(val.toLowerCase()) &&
          !localPart.match(/^(test|fake|admin|spam|user|info|contact)/)
        );
      },
      { message: "Invalid email format" },
    ),

  password: z.string().superRefine((password, ctx) => {
    passwordValidation(password, ctx);
  }),
});

// Register schema, extending LoginSchema and adding confirmPassword with error concatenation
export const RegisterSchema = LoginSchema.extend({
  confirmPassword: z.string({ required_error: "Confirm your password" }),
}).superRefine((data, ctx) => {
  passwordValidation(data.password, ctx);

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

// Password reset schema, omitting name and password fields
export const ResetEmailSchema = LoginSchema.omit({
  name: true,
  password: true,
});

// Simplified schema for login form without the name field
export const LoginSchemaForm = LoginSchema.omit({
  name: true,
});

// Type definitions
export type LoginSchemaForm = z.infer<typeof LoginSchemaForm>;
export type RegisterSchemaForm = z.infer<typeof RegisterSchema>;

// New password schema with confirmPassword, using shared password validation function
export const NewPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    passwordValidation(data.password, ctx);

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Type for new password form schema
export type NewPasswordSchemaForm = z.infer<typeof NewPasswordSchema>;

// Type for password reset schema
export type ResetSchemaForm = z.infer<typeof ResetEmailSchema>;

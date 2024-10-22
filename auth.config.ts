import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchemaWithoutVerification } from "./lib/loginFormSchema/login-signin-types";
import { getUserByEmail } from "./lib/data/user";
import bcryptjs from "bcryptjs";

//TODO  11:32 PM. INPUT PASSWORD BOTH LOGIN/REGISTER NO SHOW OPTION
//TO COTINUE: EXTEND SESSION OBJECT FIELD
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields =
          LoginSchemaWithoutVerification.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

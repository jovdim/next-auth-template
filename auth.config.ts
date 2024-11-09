import GitHub from "next-auth/providers/github";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "@prisma/client";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      async authorize(user) {
        if (!user.email) return null;
        return user as User;
      },
    }),
  ],
} satisfies NextAuthConfig;

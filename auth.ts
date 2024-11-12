import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./authentication/lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./authentication/lib/db";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: UserRole;
    emailVerified: Date | null;
  }
  interface Session {
    user: {
      id: string;
      userRole: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // allow credentials login
      if (account?.provider === "credentials") return true;

      if (!account || !profile?.email) {
        console.warn("Sign-in attempt missing account or email data");
        return false;
      }

      if (!profile.email_verified) {
        return "/auth/login?error=Access+Denied";
      }
      try {
        // Check if user exists with provided email
        let existingUser = await db.user.findUnique({
          where: { email: profile.email },
        });

        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        // Handle account linking
        if (!existingAccount) {
          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                email: profile.email,
                name: user.name || profile.name,
                image: user.image || profile.picture,
                role: "USER",
                emailVerified: profile.email_verified ? new Date() : null,
              },
            });
          }

          await db.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
        }
        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.userRole = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.userRole && session.user)
        session.user.userRole = token.userRole as UserRole;
      return session;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

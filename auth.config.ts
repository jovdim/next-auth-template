import GitHub from "next-auth/providers/github";
import { DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User, UserRole } from "@prisma/client";
import db from "./authentication/lib/db";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: {
      userRole: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}

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
  callbacks: {
    async signIn({ user, account, profile }) {
      // allow credentials login
      if (account?.provider === "credentials") return true;

      if (!account || !profile?.email) {
        console.warn("Sign-in attempt missing account or email data");
        return false;
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
                name: user.name || profile.name || "no-name",
                image:
                  user.image ||
                  profile.picture ||
                  profile.avatar_link ||
                  "/profile-placeholder.svg", //change with a real external default image link for you app
                role: "USER",
                emailVerified: new Date(),
              },
            });
          }
          //check if the email is verified if not verfied it.
          if (existingUser && !existingUser.emailVerified) {
            existingUser = await db.user.update({
              where: {
                email: profile.email,
              },
              data: {
                email: profile.email,
                name: user.name || profile.name || "no-name",
                image:
                  user.image ||
                  profile.picture ||
                  profile.avatar_link ||
                  "/profile-placeholder.svg", //Replace to real image link
                emailVerified: new Date(),
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
} satisfies NextAuthConfig;

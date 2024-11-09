import { NextResponse } from "next/server";
import authConfig from "./auth.config";

import NextAuth from "next-auth";
import {
  PUBLIC_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  AUTHENTICATION_ROUTES,
  API_PREFIX_AUTHENTICATIONI,
} from "./route";

// Use Sets for faster lookups
const publicRoutes = new Set(PUBLIC_ROUTES);
const authRoutes = new Set(AUTHENTICATION_ROUTES);

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedin = Boolean(req.auth?.user);

  const isApiAuthRoute = nextUrl.pathname.startsWith(
    API_PREFIX_AUTHENTICATIONI,
  );
  const isPublicRoute = publicRoutes.has(nextUrl.pathname);
  const isAuthRoute = authRoutes.has(nextUrl.pathname);

  // Handle API authentication routes first (no special handling needed)
  if (isApiAuthRoute) return NextResponse.next();

  // Redirect authenticated users from auth routes to settings
  if (isAuthRoute && isLoggedin) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedin && !isPublicRoute && !isAuthRoute) {
    // Redirect to login only if not already on login or register page
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // Proceed normally if no redirects are required
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

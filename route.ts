/**
 * An array of routes that are accessible to the public
 * These routes do not requeire authentication
 * @type {string[]}
 */

export const PUBLIC_ROUTES = ["/", "/auth/register/email-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect to /settings
 * @type {string[]}
 */

export const AUTHENTICATION_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/reset/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_PREFIX_AUTHENTICATIONI = "/api/auth";

/**
 * The default redirect path after log in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";

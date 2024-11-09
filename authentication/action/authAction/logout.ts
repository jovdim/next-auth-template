"use server";

import { signOut } from "@/auth";

export default async function Logout() {
  return await signOut({ redirect: true, redirectTo: "/" });
}

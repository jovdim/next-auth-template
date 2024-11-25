import Link from "next/link";
import React from "react";

export function LoginButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/auth/login">
      <span className="cursor-pointer">{children}</span>
    </Link>
  );
}

export function RegisterButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/auth/register">
      <span className="cursor-pointer">{children}</span>
    </Link>
  );
}

export function GithubSource({ children }: { children: React.ReactNode }) {
  return (
    <Link href="https://github.com/jovdim/next-auth-template" className="bg-white rounded-full">
      <span className="cursor-pointer">{children}</span>
    </Link>
  );
}

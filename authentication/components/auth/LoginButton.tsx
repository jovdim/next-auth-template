"use client";

import { LogInButtonProps } from "@/authentication/lib/types";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginButton({
  children,
}: LogInButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

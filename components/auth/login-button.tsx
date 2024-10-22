"use client";

import { LogInButtonProps } from "@/lib/types";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LogInButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") return <span>TODO: Implement Modal</span>;
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

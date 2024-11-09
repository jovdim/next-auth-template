import React from "react";
import { Button } from "../../../components/ui/button";
import { BackButtonProps } from "@/authentication/lib/types";
import Link from "next/link";

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

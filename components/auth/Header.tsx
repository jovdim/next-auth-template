import { PoppinsFont } from "@/app/fonts/font";
import { HeaderProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import React from "react";

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", PoppinsFont.className)}>
        🔐Auth
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

import { PoppinsFont } from "@/app/fonts/font";
import { HeaderProps } from "@/authentication/lib/types";
import { cn } from "@/lib/utils";

export default function Header({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", PoppinsFont.className)}>
        LOGO
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

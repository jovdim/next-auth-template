import { Button } from "@/components/ui/button";
import { PoppinsFont } from "./fonts/font";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            PoppinsFont.className,
          )}
        >
          🔐Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Log in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

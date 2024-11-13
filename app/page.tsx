import { PoppinsFont } from "./fonts/font";
import { cn } from "@/lib/utils";
import NavigationBar from "@/components/NavigationBar";

export default function Home() {
  return (
    <main className="relative flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <NavigationBar />
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            PoppinsFont.className,
          )}
        >
          Auth.js🛡️
        </h1>
        <p className="text-lg text-white">
          A complete template for Auth.js(next-auth.js)
        </p>
      </div>
    </main>
  );
}

import { PoppinsFont } from "./fonts/font";
import { cn } from "@/lib/utils";
import NavigationBar from "@/components/NavigationBar";

export default function Home() {
  return (
    <main className="relative flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <NavigationBar />
      <div className="space-y-6  flex justify-center items-center flex-col ">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            PoppinsFont.className,
          )}
        >
          Auth.js Template 🛡️
        </h1>
        <p className="max-w-[70%] text-center text-lg text-white">
          A comprehensive, ready-to-use template for integrating Auth.js
          (NextAuth.js), providing a seamless and secure authentication solution
          for your web applications
        </p>
      </div>
    </main>
  );
}

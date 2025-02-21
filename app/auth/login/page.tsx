import LoginForm from "@/authentication/components/auth/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

import NewPasswordForm from "@/authentication/components/auth/NewPasswordForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}

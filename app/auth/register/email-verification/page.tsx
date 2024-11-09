import VerificationForm from "@/authentication/components/auth/authForm/VerificationForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
}

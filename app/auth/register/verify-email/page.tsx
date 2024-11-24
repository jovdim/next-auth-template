import EmailResend from "@/authentication/components/auth/authForm/EmailResend";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <EmailResend />
    </Suspense>
  );
}

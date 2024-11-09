"use client";

import { emailVerification } from "@/authentication/action/authAction/email-verification";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "../CardWrapper";
import { BeatLoader } from "react-spinners";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

export default function VerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("token not Found!");
      return;
    }
    await emailVerification(token)
      .then((res) => {
        setSuccess(res.success);
        setError(res.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex w-full items-center justify-center">
        {!error && !success ? (
          <BeatLoader />
        ) : (
          <>
            <FormSuccess message={success} />
            <FormError message={error} />
          </>
        )}
      </div>
    </CardWrapper>
  );
}

import React from "react";
import CardWrapper from "./CardWrapper";
import ResetUseForm from "./authForm/ResetUseForm";

export default function ResetForm() {
  return (
    <CardWrapper
      headerLabel="Reset you password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <ResetUseForm />
    </CardWrapper>
  );
}

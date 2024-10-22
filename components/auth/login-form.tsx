
import React from "react";
import CardWrapper from "./CardWrapper";
import LoginUseForm from "./authForm/LoginUseForm";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't Have an Account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <LoginUseForm />
    </CardWrapper>
  );
}

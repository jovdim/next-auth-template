import React from "react";
import CardWrapper from "./CardWrapper";
import { MdErrorOutline } from "react-icons/md";
export default function ErrorForm() {
  return (
    <CardWrapper
      headerLabel="Something went wrong. Please try again!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <MdErrorOutline className="flex size-28 w-full items-center justify-center text-red-500/80" />
    </CardWrapper>
  );
}

import RegisterUseForm from "./authForm/RegisterUseForm";
import CardWrapper from "./CardWrapper";

export default function RegisterForm() {
  return (
    <CardWrapper
      headerLabel="Create new Account"
      backButtonHref="/auth/login"
      backButtonLabel="Aready have an Account?"
      showSocial
    >
      <RegisterUseForm />
    </CardWrapper>
  );
}

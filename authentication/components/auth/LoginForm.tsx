import LoginUseForm from "./authForm/LoginUseForm";
import CardWrapper from "./CardWrapper";


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

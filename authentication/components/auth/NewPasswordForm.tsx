import NewPasswordUseForm from "./authForm/NewPasswordUseForm";
import CardWrapper from "./CardWrapper";


export default function NewPasswordForm() {
  return (
    <CardWrapper
      headerLabel="new your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <NewPasswordUseForm />
    </CardWrapper>
  );
}

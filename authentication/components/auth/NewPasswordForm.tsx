import NewPasswordUseForm from "./authForm/NewPasswordUseForm";
import CardWrapper from "./CardWrapper";


export default function NewPasswordForm() {
  return (
    <CardWrapper
      headerLabel="Enter your new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <NewPasswordUseForm />
    </CardWrapper>
  );
}

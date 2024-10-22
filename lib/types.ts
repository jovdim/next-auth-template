//login-button.tsx
export interface LogInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

//CardWrapper.tsx
export interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

//Header.tsx
export interface HeaderProps {
  label: string;
}

//BackButton.tsx
export interface BackButtonProps {
  href: string;
  label: string;
}

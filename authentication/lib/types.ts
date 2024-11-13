
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

export interface userData {
  name: string;
  email: string;
  image?: string;
}

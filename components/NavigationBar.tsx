import React from "react";
import { Button } from "./ui/button";
import {
  GithubSource,
  LoginButton,
  RegisterButton,
} from "@/authentication/components/auth/LoginButton";
import { FaGithub } from "react-icons/fa";

export default function NavigationBar() {
  return (
    <nav className="absolute right-4 top-4 flex items-center gap-x-4">
      <LoginButton>
        <Button variant="secondary" size="lg">
          Login
        </Button>
      </LoginButton>
      <RegisterButton>
        <Button variant="secondary" size="lg">
          Signup
        </Button>
      </RegisterButton>
      <GithubSource>
        <span>
          <FaGithub className="size-12" />
        </span>
      </GithubSource>
    </nav>
  );
}

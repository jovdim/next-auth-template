"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemaForm } from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { Input } from "@/components/ui/input";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { loginUser } from "@/authentication/action/authAction/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeSlash } from "phosphor-react";

export default function LoginUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);


  const form = useForm<LoginSchemaForm>({
    defaultValues: {
      email: "",
      password: "",
      
    },
  });

  // Use watch to monitor the values of email and password fields
  const email = form.watch("email");
  const password = form.watch("password");

  // Determine if the login button should be disabled
  const isButtonDisabled = !email || !password;
  const params = useSearchParams();
  const urlError =
    params.get("error") === "AccessDenied"
      ? "User's email with the provider is unverified!"
      : "";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: LoginSchemaForm) => {
          setSuccess("");
          setError("");

          startTransition(() => {
            loginUser(data).then((response) => {
              if (response) {
                setSuccess(response.success);
                setError(response.error);
              }
            });
          });
        })}
        className="space-y-6"
      >
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe77@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
            <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Your Password"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeSlash size={15} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"link"}
            size={"sm"}
            asChild
            className="px-0 font-normal"
          >
            <Link href={"/auth/reset"}>Forgot password?</Link>
          </Button>
        </div>

        <FormSuccess message={success} />
        <FormError message={error || urlError} />

        {/* Button to log in, disabled if email or password is empty */}
        <Button
          type="submit"
          variant="logInButton"
          disabled={isButtonDisabled || isPending}
        >
          {isPending ? <Spinner /> : "Log In"}
        </Button>
      </form>
    </Form>
  );
}

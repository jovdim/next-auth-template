"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemaForm } from "@/lib/loginFormSchema/login-signin-types";
import { Input } from "@/components/ui/input";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { loginUser } from "@/action/loginAction/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: LoginSchemaForm) => {
          setSuccess("");
          setError("");

          startTransition(() => {
            loginUser(data).then((response) => {
              setSuccess(response.success);
              setError(response.error);
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
                  <Input
                    {...field}
                    placeholder="Your Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />

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

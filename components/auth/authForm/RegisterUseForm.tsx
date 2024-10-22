"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ResendButton from "../ResendButton";
import { Input } from "@/components/ui/input";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { registerUser } from "@/action/loginAction/register";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  LoginSchema,
  LoginSchemaForm,
  RegisterSchemaForm,
} from "@/lib/loginFormSchema/login-signin-types";

export default function RegisterUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<RegisterSchemaForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      emailVerification: "",
    },
    mode: "onChange",
  });

  const enableButton = !form.formState.isValid;
  console.log(enableButton);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: RegisterSchemaForm) => {
          setSuccess("");
          setError("");

          startTransition(() => {
            registerUser(data).then((response) => {
              setSuccess(response.success);
              setError(response.error);
            });
          });
        })}
        className="space-y-6"
      >
        <div className="space-y-4">

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="johndoe" type="text" maxLength={40}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Email Verificaton */}
          <FormField
            control={form.control}
            name="emailVerification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Code</FormLabel>
                <div className="flex items-center justify-center gap-x-4">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <ResendButton isButtonDisabled={enableButton} />
                </div>
                <FormDescription className="text-yellow-600">
                  You can skip this Email verification for now
                </FormDescription>
                <FormMessage className="text-emerald-500" />
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
          disabled={enableButton || isPending}
        >
          {isPending ? <Spinner /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}

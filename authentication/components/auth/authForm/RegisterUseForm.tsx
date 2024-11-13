"use client";

import { registerUser } from "@/authentication/action/authAction/register";
import {
  RegisterSchema,
  RegisterSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Eye, EyeSlash, XCircle } from "phosphor-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import Spinner from "../Spinner";

export default function RegisterUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterSchemaForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const enableButton = !form.formState.isValid;

  const passwordRequirements = [
    { test: (pw: string) => pw.length >= 12, label: "Min 12 chars" },
    { test: (pw: string) => /[A-Z]/.test(pw), label: "Uppercase" },
    { test: (pw: string) => /\d/.test(pw), label: "Number" },
    { test: (pw: string) => /[@$!%*?&#]/.test(pw), label: "Special char" },
    { test: (pw: string) => !/\s/.test(pw), label: "No spaces" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: RegisterSchemaForm) => {
          setSuccess("");
          setError("");

          startTransition(() => {
            registerUser(data).then((response) => {
              if (!response) return;
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
                  <Input
                    {...field}
                    placeholder="johndoe"
                    type="text"
                    maxLength={40}
                  />
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
                <ul className="flex flex-wrap items-center gap-x-1 space-y-1 text-[12px]">
                  {passwordRequirements.map((req) => {
                    const isMet = req.test(field.value);
                    return (
                      <li
                        key={req.label}
                        className={`flex ${isMet ? "text-green-600" : "text-red-600"}`}
                      >
                        {isMet ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                        {req.label + ","}
                      </li>
                    );
                  })}
                </ul>
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm your Password"
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
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />

        {/* Submit Button */}
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

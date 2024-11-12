"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewPasswordSchema,
  NewPasswordSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { Input } from "@/components/ui/input";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import newPassword from "@/authentication/action/authAction/new-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, Eye, EyeSlash, X, XCircle } from "phosphor-react";
import { useSearchParams } from "next/navigation";

export default function NewPasswordUseForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<NewPasswordSchemaForm>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

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
        onSubmit={form.handleSubmit((data: NewPasswordSchemaForm) => {
          setSuccess(undefined);
          setError(undefined);
          startTransition(() => {
            newPassword(data, token).then((response) => {
              if (response) {
                setSuccess(response.success || undefined);
                setError(response.error || undefined);
              }
            });
          });
        })}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <>
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
                  </>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <>
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
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />

        <Button
          type="submit"
          variant="logInButton"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? <Spinner /> : "Confirm password"}
        </Button>
      </form>
    </Form>
  );
}

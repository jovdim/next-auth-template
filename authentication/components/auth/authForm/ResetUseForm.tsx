"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  ResetSchemaForm,
} from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
import { Input } from "@/components/ui/input";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/authentication/action/authAction/reset-password";

export default function ResetUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<ResetSchemaForm>({
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: ResetSchemaForm) => {
          setSuccess("");
          setError("");

          startTransition(() => {
            resetPassword(data).then((response) => {
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
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />

        <Button type="submit" variant="logInButton" disabled={isPending}>
          {isPending ? <Spinner /> : "Send reset email"}
        </Button>
      </form>
    </Form>
  );
}

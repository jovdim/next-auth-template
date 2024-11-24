"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResetSchemaForm } from "@/authentication/lib/validationFormSchema/validation-form-schema-types";
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

const COUNTDOWN_DURATION = 60; 

export default function ResetUseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [countdown, setCountdown] = useState<number>(0); // Countdown starts at 0
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false); 

  const form = useForm<ResetSchemaForm>({
    defaultValues: {
      email: "",
    },
  });
  const email = form.watch("email");

  useEffect(() => {
    // Check localStorage for the last reset time only if the countdown isn't already active
    const lastResetTime = localStorage.getItem("password-reset-timestamp");
    if (lastResetTime && countdown === 0) {
      const elapsed = Math.floor((Date.now() - parseInt(lastResetTime)) / 1000); // Time elapsed since last reset
      const remainingTime = Math.max(COUNTDOWN_DURATION - elapsed, 0);
      setCountdown(remainingTime);
      setIsResendDisabled(remainingTime > 0);
    }

    // Start the countdown timer if it's greater than 0
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [countdown]);

  const handleSubmit = async (data: ResetSchemaForm) => {
    setSuccess("");
    setError("");

    // Start transition to process the reset password request
    startTransition(() => {
      resetPassword(data).then((response) => {
        if (response.success) {
          // Only start the countdown if the email is sent successfully
          setSuccess(response.success);
          setError(""); // Reset any error messages
          setIsResendDisabled(true); // Disable the button
          setCountdown(COUNTDOWN_DURATION); // Start countdown from set duration
          localStorage.setItem(
            "password-reset-timestamp",
            Date.now().toString(),
          ); // Store timestamp for future checks
        } else {
          setError(response.error || "An error occurred.");
          setSuccess(""); // Clear success message if there is an error
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    disabled={isResendDisabled} // Disable input while countdown is active
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Success or Error Messages */}
        <FormSuccess message={success} />
        <FormError message={error} />

        {/* Countdown Timer */}
        {isResendDisabled && countdown > 0 && (
          <p className="text-center text-sm text-gray-500">
            You can request a new reset in {countdown} seconds.
          </p>
        )}

        <Button
          type="submit"
          variant="logInButton"
          disabled={isResendDisabled || !email}
        >
          {isPending ? <Spinner /> : "Send reset email"}
        </Button>
      </form>
    </Form>
  );
}

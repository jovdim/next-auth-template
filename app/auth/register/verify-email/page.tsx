"use client";

import resendEmail from "@/authentication/action/authAction/resend-email";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const COUNTDOWN_DURATION = 120; // Countdown duration in seconds

export default function EmailSentPage() {
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION); // Initial countdown timer
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Resend button state
  const params = useSearchParams();
  const encodedEmail = params.get("email");
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;

  useEffect(() => {
    // Check localStorage for the last timer start
    const lastStart = localStorage.getItem("email-resend-timestamp");
    if (lastStart) {
      const elapsed = Math.floor((Date.now() - parseInt(lastStart)) / 1000); // Time elapsed since last start
      const remaining = Math.max(COUNTDOWN_DURATION - elapsed, 0);
      setCountdown(remaining);
      setIsResendDisabled(remaining > 0);
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
  }, []);

  const handleResend = async () => {
    setIsResendDisabled(true); // Disable the button while sending
    setCountdown(COUNTDOWN_DURATION); // Reset the timer
    localStorage.setItem("email-resend-timestamp", Date.now().toString()); // Save the start time

    // Immediately start the countdown after first click
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

    try {
      // Trigger the email resend function
      await resendEmail({ email: email || "" });
    } catch (error) {
      console.error("Error resending email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg bg-blue-50">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-4 text-center text-3xl font-semibold text-blue-600">
          Verify Your Email
        </h1>
        <p className="mb-6 text-center text-gray-600">
          A verification email has been sent to:
        </p>
        <p className="mb-6 text-center text-lg font-medium text-blue-500">
          {email || "your email address"}
        </p>
        <p className="mb-6 text-center text-sm text-gray-500">
          Please check your inbox and follow the instructions to complete the
          verification process. If you don&apos;t see the email, check your spam
          folder.
        </p>

        <div className="flex flex-col items-center">
          {countdown > 0 ? (
            <div className="mb-4 flex flex-col items-center">
              <BeatLoader color="#2563EB" size={10} className="mb-2" />
              <p className="text-sm text-gray-500">
                Resend available in{" "}
                <span className="font-medium">{countdown}s</span>
              </p>
            </div>
          ) : (
            <p className="mb-4 text-sm text-gray-500">
            If you did not receive the email, you may request a resend.
          </p>
          
          )}

          <Button
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`w-full rounded-md py-2 text-center font-semibold text-white transition ${
              isResendDisabled
                ? "cursor-not-allowed bg-blue-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Resend Email
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client"; 

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "../ui/button";

export default function ResendButton({
  isButtonDisabled,
}: {
  isButtonDisabled: boolean;
}) {
  const { countdown, startCountdown } = useCountdown(60);


  return (
    <TooltipProvider  delayDuration={100}>
      <Tooltip >
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="w-32"
            variant="logInButton"
            disabled={!!countdown || isButtonDisabled}
            onClick={startCountdown}
          >
            {countdown ? `Resend (${countdown}s)` : "Send"}
          </Button>
        </TooltipTrigger>
        <TooltipContent >
          <p>i can&apos;t afford one domain for each project ^-^</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

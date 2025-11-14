"use client";

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl py-16">
      <Alert className="border-red-500/40 bg-red-500/10 text-white">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p>{error.message || "An unexpected error occurred."}</p>
          <Button
            type="button"
            className="bg-white/10 text-white hover:bg-white/20"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

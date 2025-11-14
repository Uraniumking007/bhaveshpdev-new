"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Label } from "@/components/form-stuff/label";
import { Input } from "@/components/form-stuff/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getCredentialsSigninMessage,
  getDefaultCredentialsErrorMessage,
} from "@/lib/auth-error-messages";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamError = useMemo(
    () =>
      getCredentialsSigninMessage({
        error: searchParams.get("error"),
        code: searchParams.get("code"),
      }),
    [searchParams]
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParamError
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(searchParamError);
  }, [searchParamError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
        callbackUrl: "/admin",
      });

      if (!result) {
        setErrorMessage(getDefaultCredentialsErrorMessage());
        return;
      }

      if (result.error) {
        setErrorMessage(
          getCredentialsSigninMessage({
            error: result.error,
            code: null,
          }) ?? getDefaultCredentialsErrorMessage()
        );
        return;
      }

      if (result.url) {
        router.push(result.url);
      } else {
        router.push("/admin");
      }
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage(getDefaultCredentialsErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen z-50 w-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Sign In</h1>
          <p className="text-white/70 mt-2">
            Sign in to access the admin panel
          </p>
        </div>

        {errorMessage ? (
          <Alert className="border-red-500/40 bg-red-500/10 text-white">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              id="email"
              placeholder="your@email.com"
              type="email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          <button
            className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in \u2192"}
          </button>

          <div className="bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-px w-full" />

          <button
            type="button"
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Continue with GitHub
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

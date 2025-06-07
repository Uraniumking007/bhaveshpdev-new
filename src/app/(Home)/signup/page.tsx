"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";
import { IconArrowLeft, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { signUp } from "./actions";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push("/admin/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    try {
      await signIn("github", {
        callbackUrl: "/admin",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign up with GitHub"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="text-white/70 mt-2">
            Sign up to access the admin panel
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Choose a username"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className={cn(
                "w-full bg-blue-500 hover:bg-blue-600 text-white",
                "transition-all duration-300",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white/70">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGitHubSignup}
            className={cn(
              "w-full bg-white/10 hover:bg-white/20 text-white",
              "transition-all duration-300",
              "flex items-center justify-center gap-2"
            )}
          >
            <IconBrandGithub className="w-5 h-5" />
            Continue with GitHub
          </Button>

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-white/70 hover:text-white",
                "transition-colors duration-200"
              )}
            >
              <IconArrowLeft className="w-4 h-4" />
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

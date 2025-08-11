import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { IconLogin, IconHome } from "@tabler/icons-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="text-white/70 max-w-md mx-auto">
          You don&apos;t have permission to access this page. Please contact the
          administrator if you believe this is a mistake.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className={cn(
              "inline-flex items-center gap-2 text-sm",
              "text-white/70 hover:text-white",
              "transition-colors duration-200"
            )}
          >
            <Link href="/" className="flex items-center gap-2">
              <IconHome className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "inline-flex items-center gap-2 text-sm",
              "text-white/70 hover:text-white",
              "transition-colors duration-200"
            )}
          >
            <Link href="/signin" className="flex items-center gap-2">
              <IconLogin className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="text-white/70 max-w-md mx-auto">
          You don&apos;t have permission to access this page. Please contact the
          administrator if you believe this is a mistake.
        </p>
        <Button
          className={cn(
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300"
          )}
        >
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

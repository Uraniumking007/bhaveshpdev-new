import { AdminLayout } from "@/components/layouts/admin-layout";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-black text-white w-full">
      <AdminLayout>
        <Suspense
          fallback={
            <Skeleton className="h-full w-full rounded-2xl bg-white/10 animate-pulse" />
          }
        >
          {children}
        </Suspense>
      </AdminLayout>
    </div>
  );
}

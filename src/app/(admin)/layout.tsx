import { AdminLayout } from "@/components/layouts/admin-layout";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/unauthorized");
  }

  return <AdminLayout>{children}</AdminLayout>;
}

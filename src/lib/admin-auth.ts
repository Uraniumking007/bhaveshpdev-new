"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }
  return session;
}

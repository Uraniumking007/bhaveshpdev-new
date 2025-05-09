"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBackdoors() {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      throw new Error("Unauthorized");
    }

    return await prisma.confirmation.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching backdoors:", error);
    throw error;
  }
}

export async function deleteBackdoor(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.confirmation.delete({
      where: { id: BigInt(id) },
    });

    revalidatePath("/admin/backdoors");
    return { success: true };
  } catch (error) {
    console.error("Error deleting backdoor:", error);
    return { success: false, error: "Failed to delete backdoor" };
  }
}

export async function createBackdoor(data: {
  hostname: string;
  payment: number;
  statuscode: "authorized" | "partial" | "unauthorized";
}) {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.confirmation.create({
      data: {
        hostname: data.hostname,
        payment: data.payment,
        statuscode: data.statuscode,
      },
    });

    revalidatePath("/admin/backdoors");
    return { success: true };
  } catch (error) {
    console.error("Error creating backdoor:", error);
    return { success: false, error: "Failed to create backdoor" };
  }
}

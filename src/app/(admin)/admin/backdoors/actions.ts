"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function getBackdoors() {
  await requireAdmin();
  try {
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
    await requireAdmin();

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
    await requireAdmin();

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

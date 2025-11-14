"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

interface CertificationData {
  title: string;
  issuer: string;
  date: Date;
  description?: string | null;
  imageUrl?: string | null;
  credentialUrl?: string | null;
  pdfUrl?: string | null;
  visible: "public" | "private";
}

export async function createCertification(data: CertificationData) {
  try {
    await requireAdmin();
    await prisma.certification.create({
      data,
    });

    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");

    return { success: true };
  } catch (error) {
    console.error("Error creating certification:", error);
    return { success: false, error: "Failed to create certification" };
  }
}

export async function deleteCertification(id: string) {
  try {
    await requireAdmin();
    await prisma.certification.delete({
      where: { id },
    });

    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");

    return { success: true };
  } catch (error) {
    console.error("Error deleting certification:", error);
    return { success: false, error: "Failed to delete certification" };
  }
}

export async function updateCertification(id: string, data: CertificationData) {
  try {
    await requireAdmin();
    await prisma.certification.update({
      where: { id },
      data,
    });

    revalidatePath("/certifications");
    revalidatePath("/admin/certifications");

    return { success: true };
  } catch (error) {
    console.error("Error updating certification:", error);
    return { success: false, error: "Failed to update certification" };
  }
}

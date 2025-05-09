"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "../../api/auth/[...nextauth]/auth";

interface CertificationData {
  title: string;
  issuer: string;
  date: Date;
  description?: string | null;
  imageUrl?: string | null;
  credentialUrl?: string | null;
  pdfUrl?: string | null;
}

export async function createCertification(data: CertificationData) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
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
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
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
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
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

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CertificationData = {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
  pdfUrl?: string;
};

export async function createCertification(data: CertificationData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    const certification = await prisma.certification.create({
      data: {
        title: data.title,
        issuer: data.issuer,
        date: new Date(data.date),
        description: data.description,
        imageUrl: data.imageUrl,
        credentialUrl: data.credentialUrl,
        pdfUrl: data.pdfUrl,
      },
    });

    revalidatePath("/admin/certifications");
    return { success: true, data: certification };
  } catch (error) {
    console.error("Error creating certification:", error);
    return { success: false, error: "Failed to create certification" };
  }
}

export async function updateCertification(id: string, data: CertificationData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    const certification = await prisma.certification.update({
      where: { id },
      data: {
        title: data.title,
        issuer: data.issuer,
        date: new Date(data.date),
        description: data.description,
        imageUrl: data.imageUrl,
        credentialUrl: data.credentialUrl,
        pdfUrl: data.pdfUrl,
      },
    });

    revalidatePath("/admin/certifications");
    return { success: true, data: certification };
  } catch (error) {
    console.error("Error updating certification:", error);
    return { success: false, error: "Failed to update certification" };
  }
}

export async function deleteCertification(id: string) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.certification.delete({
      where: { id },
    });

    revalidatePath("/admin/certifications");
    return { success: true };
  } catch (error) {
    console.error("Error deleting certification:", error);
    return { success: false, error: "Failed to delete certification" };
  }
}

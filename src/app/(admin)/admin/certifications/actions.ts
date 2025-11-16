"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  createTimelineEntry,
  updateTimelineEntry,
  removeTimelineEntry,
} from "../timeline/actions";

export type CertificationData = {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  visible?: "public" | "private";
  addToTimeline?: boolean;
};

/**
 * Check if a timeline entry exists for a certification
 * by matching title, year, and type "certification"
 */
async function findTimelineEntryForCertification(
  title: string,
  date: Date
): Promise<{ id: string; yearStart: string } | null> {
  const yearStart = date.getFullYear().toString();
  const entry = await prisma.timeline.findFirst({
    where: {
      title: title,
      yearStart: yearStart,
      type: "certification",
    },
  });

  if (entry) {
    return { id: entry.id, yearStart: entry.yearStart ?? "" };
  }
  return null;
}

/**
 * Get certification with timeline status
 */
export async function getCertificationWithTimelineStatus(id: string) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  const certification = await prisma.certification.findUnique({
    where: { id },
  });

  if (!certification) {
    return null;
  }

  const timelineEntry = await findTimelineEntryForCertification(
    certification.title,
    certification.date
  );

  return {
    certification,
    hasTimelineEntry: timelineEntry !== null,
    timelineEntryId: timelineEntry?.id,
  };
}

/**
 * Check timeline status for multiple certifications
 * Returns a map of certification ID to boolean indicating if timeline entry exists
 */
export async function getCertificationsTimelineStatus(
  certificationIds: string[]
): Promise<Record<string, boolean>> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  const certifications = await prisma.certification.findMany({
    where: { id: { in: certificationIds } },
  });

  const statusMap: Record<string, boolean> = {};

  // Check timeline status for each certification
  for (const cert of certifications) {
    const timelineEntry = await findTimelineEntryForCertification(
      cert.title,
      cert.date
    );
    statusMap[cert.id] = timelineEntry !== null;
  }

  return statusMap;
}

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
        visible: data.visible || "public",
      },
    });

    revalidatePath("/admin/certifications");
    revalidatePath("/certifications");

    // Add to timeline if requested and certification is public
    if (data.addToTimeline && (data.visible === "public" || !data.visible)) {
      try {
        const certDate = new Date(data.date);

        // Validate date
        if (isNaN(certDate.getTime())) {
          console.error("Invalid certification date:", data.date);
        } else {
          const yearStart = certDate.getFullYear().toString();

          // Check for duplicate timeline entry
          const existingEntry = await prisma.timeline.findFirst({
            where: {
              title: data.title,
              yearStart: yearStart,
              type: "certification",
            },
          });

          if (!existingEntry) {
            // Create description: use certification description if available and meets min length,
            // otherwise use formatted string
            let timelineDescription = data.description?.trim();

            // Ensure description meets minimum length requirement (10 chars for timeline)
            if (!timelineDescription || timelineDescription.length < 10) {
              timelineDescription = `${data.title} from ${data.issuer}`;

              // If still too short, add more context
              if (timelineDescription.length < 10) {
                timelineDescription = `Certification: ${data.title} from ${data.issuer}`;
              }
            }

            await createTimelineEntry({
              yearStart: yearStart,
              yearEnd: null,
              ongoing: false,
              title: data.title,
              description: timelineDescription,
              type: "certification",
            });

            revalidatePath("/");
            revalidatePath("/admin/timeline");
          } else {
            console.log(
              `Timeline entry already exists for certification: ${data.title} (${yearStart})`
            );
          }
        }
      } catch (timelineError) {
        // Log error but don't fail certification creation
        console.error(
          "Error creating timeline entry for certification:",
          timelineError
        );
      }
    }

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
    // Get old certification data to check for existing timeline entry
    const oldCertification = await prisma.certification.findUnique({
      where: { id },
    });

    if (!oldCertification) {
      return { success: false, error: "Certification not found" };
    }

    const newDate = new Date(data.date);
    const oldDate = oldCertification.date;

    // Update certification
    const certification = await prisma.certification.update({
      where: { id },
      data: {
        title: data.title,
        issuer: data.issuer,
        date: newDate,
        description: data.description,
        imageUrl: data.imageUrl,
        credentialUrl: data.credentialUrl,
        pdfUrl: data.pdfUrl,
        visible: data.visible || oldCertification.visible,
      },
    });

    revalidatePath("/admin/certifications");
    revalidatePath("/certifications");

    const isPublic = certification.visible === "public";

    // Handle timeline logic
    if (data.addToTimeline && isPublic) {
      // Add or update timeline entry
      try {
        // Check for existing timeline entry (by old title/date or new title/date)
        const oldTimelineEntry = await findTimelineEntryForCertification(
          oldCertification.title,
          oldDate
        );
        const newTimelineEntry = await findTimelineEntryForCertification(
          data.title,
          newDate
        );

        const existingEntry = oldTimelineEntry || newTimelineEntry;
        const yearStart = newDate.getFullYear().toString();

        // Create description: use certification description if available and meets min length,
        // otherwise use formatted string
        let timelineDescription = data.description?.trim();
        if (!timelineDescription || timelineDescription.length < 10) {
          timelineDescription = `${data.title} from ${data.issuer}`;
          if (timelineDescription.length < 10) {
            timelineDescription = `Certification: ${data.title} from ${data.issuer}`;
          }
        }

        if (existingEntry) {
          // Update existing timeline entry
          await updateTimelineEntry(existingEntry.id, {
            yearStart: yearStart,
            yearEnd: null,
            ongoing: false,
            title: data.title,
            description: timelineDescription,
            type: "certification",
          });
        } else {
          // Create new timeline entry
          await createTimelineEntry({
            yearStart: yearStart,
            yearEnd: null,
            ongoing: false,
            title: data.title,
            description: timelineDescription,
            type: "certification",
          });
        }

        revalidatePath("/");
        revalidatePath("/admin/timeline");
      } catch (timelineError) {
        // Log error but don't fail certification update
        console.error(
          "Error updating timeline entry for certification:",
          timelineError
        );
      }
    } else {
      // Remove from timeline if unchecked or changed to private
      try {
        // Check for existing timeline entry by old or new title/date
        const oldTimelineEntry = await findTimelineEntryForCertification(
          oldCertification.title,
          oldDate
        );
        const newTimelineEntry = await findTimelineEntryForCertification(
          data.title,
          newDate
        );

        const entryToRemove = oldTimelineEntry || newTimelineEntry;
        if (entryToRemove) {
          await removeTimelineEntry(entryToRemove.id);
          revalidatePath("/");
          revalidatePath("/admin/timeline");
        }
      } catch (timelineError) {
        // Log error but don't fail certification update
        console.error(
          "Error removing timeline entry for certification:",
          timelineError
        );
      }
    }

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

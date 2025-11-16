import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminCertificationsPageContent } from "@/components/admin-certifications-page-content";
import {
  deleteCertification,
  updateCertification,
  getCertificationsTimelineStatus,
} from "@/app/(admin)/admin/certifications/actions";
import type { CertificationFormValues } from "@/lib/validations/admin";

export const metadata: Metadata = {
  title: "Manage Certifications | Bhavesh P Dev",
  description: "Manage your certifications and achievements",
};

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: {
      date: "desc",
    },
  });

  // Get timeline status for all certifications
  const certificationIds = certifications.map((cert) => cert.id);
  const timelineStatusMap = await getCertificationsTimelineStatus(
    certificationIds
  );

  return (
    <AdminCertificationsPageContent
      certifications={certifications}
      timelineStatusMap={timelineStatusMap}
      onDelete={async (id: string) => {
        "use server";
        return await deleteCertification(id);
      }}
      onUpdate={async (id: string, data: CertificationFormValues) => {
        "use server";
        return await updateCertification(id, {
          title: data.title,
          issuer: data.issuer,
          date: data.date,
          description: data.description,
          imageUrl: data.imageUrl,
          pdfUrl: data.pdfUrl,
          visible: data.visible,
          addToTimeline: data.addToTimeline,
        });
      }}
    />
  );
}

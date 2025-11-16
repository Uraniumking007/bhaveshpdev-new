import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CertificationForm } from "@/components/forms/certification-form";
import { CertificationAdminCard } from "@/components/cards/certification-admin-card";
import {
  deleteCertification,
  updateCertification,
  getCertificationsTimelineStatus,
} from "@/app/(admin)/admin/certifications/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          Credentials
        </p>
        <h1 className="text-3xl font-bold text-white">Certifications</h1>
        <p className="mt-2 text-white/70">
          Capture new achievements and keep existing records current.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader>
            <CardTitle>Add certification</CardTitle>
            <CardDescription className="text-white/60">
              Upload a new credential with full context and visibility settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CertificationForm />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader>
            <CardTitle>Existing entries</CardTitle>
            <CardDescription className="text-white/60">
              Edit or remove previously published certifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {certifications.map((certification) => (
              <CertificationAdminCard
                key={certification.id}
                certification={certification}
                hasTimelineEntry={timelineStatusMap[certification.id] ?? false}
                onDelete={async () => {
                  "use server";
                  return await deleteCertification(certification.id);
                }}
                onUpdate={async (data: CertificationFormValues) => {
                  "use server";
                  return await updateCertification(certification.id, {
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
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

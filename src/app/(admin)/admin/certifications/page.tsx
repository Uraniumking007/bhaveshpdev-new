import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CertificationForm } from "@/components/forms/certification-form";
import { CertificationAdminCard } from "@/components/cards/certification-admin-card";
import {
  deleteCertification,
  updateCertification,
} from "@/app/(admin)/admin/certifications";
import { Certification } from "@prisma/client";

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Certifications</h1>
        <p className="text-white/70 mt-2">
          Manage your certifications and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Add New Certification
          </h2>
          <CertificationForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Existing Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <CertificationAdminCard
                  certification={certification}
                  onDelete={async () => {
                    "use server";
                    await deleteCertification(certification.id);
                  }}
                  onUpdate={async (data) => {
                    "use server";
                    await updateCertification(certification.id, {
                      title: data.title,
                      issuer: data.issuer,
                      date: data.date,
                      description: data.description || null,
                      imageUrl: data.imageUrl || null,
                      pdfUrl: data.pdfUrl || null,
                      visible: data.visible,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { HeroHighlight } from "@/components/hero-highlight";
import { CertificationViewerCard } from "@/components/cards/certification-viewer-card";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Certification } from "@prisma/client";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Certifications",
  description: "Bhavesh Patil's certifications and achievements.",
};

const CertificationsPage = async () => {
  const certifications = await prisma.certification.findMany({
    where: {
      visible: "public",
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <HeroHighlight>
      <div className="w-full min-h-screen px-4 mt-28 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Certifications & Achievements
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              A collection of my professional certifications and notable
              achievements that showcase my expertise and continuous learning
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification: Certification) => (
              <CertificationViewerCard
                key={certification.id}
                certification={certification}
              />
            ))}
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default CertificationsPage;

import { HeroHighlight } from "@/components/hero-highlight";
import { CertificationsPageContent } from "@/components/certifications-page-content";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Certification } from "@prisma/client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Certifications",
  description: "Bhavesh Patil's certifications and achievements.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CertificationsPage = async () => {
  let certifications: Certification[] = [];
  try {
    certifications = await prisma.certification.findMany({
      where: {
        visible: "public",
      },
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.error("[CertificationsPage] Failed to fetch certifications", error);
  }

  return (
    <HeroHighlight>
      <Suspense
        fallback={
          <div className="w-full min-h-screen px-4 mt-28 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-12">
                <p className="text-white/60">Loading certifications...</p>
              </div>
            </div>
          </div>
        }
      >
        <CertificationsPageContent certifications={certifications} />
      </Suspense>
    </HeroHighlight>
  );
};

export default CertificationsPage;

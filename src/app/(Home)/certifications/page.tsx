import { HeroHighlight } from "@/components/hero-highlight";
import { CertificationsPageContent } from "@/components/certifications-page-content";
import { Metadata } from "next";
import { Suspense } from "react";
import { getCertifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Certifications",
  description: "Bhavesh Patil's certifications and achievements.",
};

export const revalidate = 60;

const CertificationsPage = async () => {
  const certifications = await getCertifications();

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

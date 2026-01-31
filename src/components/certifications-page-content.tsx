"use client";

import type { Certification } from "@/types/static-data";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CertificationFilters } from "./certification-filters";
import { CertificationViewerCard } from "./cards/certification-viewer-card";
import { CertificationTimelineView } from "./certification-timeline-view";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { IconLayoutGrid, IconTimeline } from "@tabler/icons-react";
import { format } from "date-fns";

interface CertificationsPageContentProps {
  certifications: Certification[];
}

export function CertificationsPageContent({
  certifications,
}: CertificationsPageContentProps) {
  const searchParams = useSearchParams();

  // Extract filter values from URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const selectedYears = searchParams.get("years")?.split(",") || [];
  const selectedIssuers = searchParams.get("issuers")?.split(",") || [];

  // Get unique years and issuers for filters
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    certifications.forEach((cert) => {
      yearSet.add(format(new Date(cert.date), "yyyy"));
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [certifications]);

  const issuers = useMemo(() => {
    const issuerSet = new Set<string>();
    certifications.forEach((cert) => {
      if (cert.issuer) {
        issuerSet.add(cert.issuer);
      }
    });
    return Array.from(issuerSet).sort();
  }, [certifications]);

  // Filter certifications
  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      // Search filter
      if (searchQuery) {
        const matchesSearch =
          cert.title.toLowerCase().includes(searchQuery) ||
          cert.issuer.toLowerCase().includes(searchQuery) ||
          (cert.description?.toLowerCase().includes(searchQuery) ?? false);
        if (!matchesSearch) return false;
      }

      // Year filter
      if (selectedYears.length > 0) {
        const certYear = format(new Date(cert.date), "yyyy");
        if (!selectedYears.includes(certYear)) return false;
      }

      // Issuer filter
      if (selectedIssuers.length > 0) {
        if (!selectedIssuers.includes(cert.issuer)) return false;
      }

      return true;
    });
  }, [certifications, searchQuery, selectedYears, selectedIssuers]);

  return (
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

        <div className="mb-8">
          <CertificationFilters years={years} issuers={issuers} />
        </div>

        {filteredCertifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg mb-2">
              No certifications found matching your filters.
            </p>
            <p className="text-white/40 text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/60 text-sm">
                Showing {filteredCertifications.length}{" "}
                {filteredCertifications.length === 1
                  ? "certification"
                  : "certifications"}
              </p>
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 flex items-center gap-2"
                >
                  <IconLayoutGrid className="w-4 h-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 flex items-center gap-2"
                >
                  <IconTimeline className="w-4 h-4" />
                  Timeline
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertifications.map((certification, index) => (
                  <CertificationViewerCard
                    key={certification.id}
                    certification={certification}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-0">
              <CertificationTimelineView
                certifications={filteredCertifications}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

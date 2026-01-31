"use client";

import type { Certification } from "@/types/static-data";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { CertificationViewerCard } from "./cards/certification-viewer-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { cn } from "@/lib/utils/cn";

interface CertificationTimelineViewProps {
  certifications: Certification[];
}

export function CertificationTimelineView({
  certifications,
}: CertificationTimelineViewProps) {
  // Group certifications by year
  const groupedByYear = certifications.reduce(
    (acc, cert) => {
      const year = format(new Date(cert.date), "yyyy");
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(cert);
      return acc;
    },
    {} as Record<string, Certification[]>
  );

  // Sort years in descending order
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  if (years.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No certifications found.</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={years[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 bg-white/5 border-white/10">
        {years.map((year) => (
          <TabsTrigger
            key={year}
            value={year}
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
          >
            {year}
          </TabsTrigger>
        ))}
      </TabsList>

      {years.map((year) => (
        <TabsContent key={year} value={year} className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h2 className="text-2xl font-bold text-white">{year}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedByYear[year]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((certification, index) => (
                  <CertificationViewerCard
                    key={certification.id}
                    certification={certification}
                    index={index}
                  />
                ))}
            </div>

            <div className="text-center text-white/50 text-sm mt-6">
              {groupedByYear[year].length}{" "}
              {groupedByYear[year].length === 1
                ? "certification"
                : "certifications"}{" "}
              in {year}
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}


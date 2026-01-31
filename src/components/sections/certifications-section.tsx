"use client";

import { motion } from "framer-motion";
import type { Certification } from "@/types/static-data";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { CertificationCarouselCard } from "../cards/certification-carousel-card";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { Button } from "../ui/button";

interface CertificationsSectionProps {
  certifications?: Certification[];
}

export default function CertificationsSection({
  certifications = [],
}: CertificationsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: certifications.length > 3,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Get recent certifications (last 6 months) or most recent 6
  const recentCertifications = certifications
    .filter((cert) => {
      const certDate = new Date(cert.date).getTime();
      const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
      return certDate > sixMonthsAgo;
    })
    .slice(0, 6)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayCertifications =
    recentCertifications.length > 0
      ? recentCertifications
      : certifications.slice(0, 6);

  if (displayCertifications.length === 0) {
    return null;
  }

  return (
    <div className="w-screen h-fit min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Recent Certifications
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Latest achievements and professional certifications that demonstrate
            continuous learning and expertise.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {displayCertifications.map((certification) => (
                <div
                  key={certification.id}
                  className="flex-[0_0_auto] min-w-0"
                >
                  <CertificationCarouselCard certification={certification} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {displayCertifications.length > 3 && (
            <>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                  "p-2 rounded-full bg-black/50 hover:bg-black/70",
                  "text-white transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "backdrop-blur-sm border border-white/10",
                  "hidden md:flex"
                )}
                aria-label="Previous certifications"
              >
                <IconChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                  "p-2 rounded-full bg-black/50 hover:bg-black/70",
                  "text-white transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "backdrop-blur-sm border border-white/10",
                  "hidden md:flex"
                )}
                aria-label="Next certifications"
              >
                <IconChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/certifications">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              View All Certifications
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


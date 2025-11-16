"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils/cn";
import { IconFilter, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificationFiltersProps {
  years: string[];
  issuers: string[];
}

export function CertificationFilters({
  years,
  issuers,
}: CertificationFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize filters from URL params
  useEffect(() => {
    const years = searchParams.get("years")?.split(",") || [];
    const issuers = searchParams.get("issuers")?.split(",") || [];
    const search = searchParams.get("search") || "";

    setSelectedYears(years);
    setSelectedIssuers(issuers);
    setSearchQuery(search);
  }, [searchParams]);

  const updateFilters = () => {
    const params = new URLSearchParams();

    if (selectedYears.length > 0) {
      params.set("years", selectedYears.join(","));
    }
    if (selectedIssuers.length > 0) {
      params.set("issuers", selectedIssuers.join(","));
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsModalOpen(false);
  };

  const handleYearToggle = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleIssuerToggle = (issuer: string) => {
    setSelectedIssuers((prev) =>
      prev.includes(issuer)
        ? prev.filter((i) => i !== issuer)
        : [...prev, issuer]
    );
  };

  const clearFilters = () => {
    setSelectedYears([]);
    setSelectedIssuers([]);
    setSearchQuery("");
    router.push(pathname);
    setIsModalOpen(false);
  };

  const activeFiltersCount =
    selectedYears.length + selectedIssuers.length + (searchQuery ? 1 : 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilters();
            }
          }}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 w-full sm:max-w-md"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 w-full sm:w-auto"
        >
          <IconFilter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={cn(
                "fixed z-50 bg-black/60 border border-white/20 rounded-lg",
                "w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-2xl",
                "max-h-[85vh] overflow-y-auto",
                "p-4 sm:p-6",
                "left-0 right-0 mx-auto top-16 sm:top-1/2 -translate-y-0 sm:-translate-y-1/2",
                "sm:left-1/2 sm:-translate-x-1/2"
              )}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-black/60 backdrop-blur-sm py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-white/20">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Filter Certifications
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <IconX className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-white">Year</Label>
                    <div className="flex flex-wrap gap-2">
                      {years.map((year) => (
                        <Button
                          key={year}
                          variant="outline"
                          size="sm"
                          onClick={() => handleYearToggle(year)}
                          className={cn(
                            "border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm",
                            selectedYears.includes(year) && "bg-white/30"
                          )}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-white">Issuer</Label>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {issuers.map((issuer) => (
                        <Button
                          key={issuer}
                          variant="outline"
                          size="sm"
                          onClick={() => handleIssuerToggle(issuer)}
                          className={cn(
                            "border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm",
                            selectedIssuers.includes(issuer) && "bg-white/30"
                          )}
                        >
                          {issuer}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-white/20 sticky bottom-0 bg-black/60 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={updateFilters}
                    className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


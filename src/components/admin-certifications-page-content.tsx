"use client";

import { useState, useMemo } from "react";
import { Certification } from "@prisma/client";
import { CertificationForm } from "@/components/forms/certification-form";
import { CertificationAdminCard } from "@/components/cards/certification-admin-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconPlus, IconSearch, IconFilter } from "@tabler/icons-react";
import type { CertificationFormValues } from "@/lib/validations/admin";
import { format } from "date-fns";

interface AdminCertificationsPageContentProps {
  certifications: Certification[];
  timelineStatusMap: Record<string, boolean>;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  onUpdate: (
    id: string,
    data: CertificationFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function AdminCertificationsPageContent({
  certifications,
  timelineStatusMap,
  onDelete,
  onUpdate,
}: AdminCertificationsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [timelineFilter, setTimelineFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Filter and sort certifications
  const filteredCertifications = useMemo(() => {
    let filtered = [...certifications];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(query) ||
          cert.issuer.toLowerCase().includes(query) ||
          (cert.description?.toLowerCase().includes(query) ?? false)
      );
    }

    // Visibility filter
    if (visibilityFilter !== "all") {
      filtered = filtered.filter((cert) => cert.visible === visibilityFilter);
    }

    // Timeline filter
    if (timelineFilter !== "all") {
      filtered = filtered.filter((cert) => {
        const hasTimeline = timelineStatusMap[cert.id] ?? false;
        return timelineFilter === "with-timeline" ? hasTimeline : !hasTimeline;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "issuer-asc":
          return a.issuer.localeCompare(b.issuer);
        case "issuer-desc":
          return b.issuer.localeCompare(a.issuer);
        default:
          return 0;
      }
    });

    return filtered;
  }, [certifications, searchQuery, visibilityFilter, timelineFilter, sortBy, timelineStatusMap]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (visibilityFilter !== "all" ? 1 : 0) +
    (timelineFilter !== "all" ? 1 : 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Credentials
          </p>
          <h1 className="text-3xl font-bold text-white">Certifications</h1>
          <p className="mt-2 text-white/70">
            Capture new achievements and keep existing records current.
          </p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2">
              <IconPlus className="w-4 h-4" />
              Add Certification
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-lg bg-neutral-950 border-white/10 text-white overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-white">Add New Certification</SheetTitle>
              <SheetDescription className="text-white/60">
                Upload a new credential with full context and visibility settings.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <CertificationForm onSuccess={() => setIsSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search and Filters */}
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconFilter className="w-5 h-5" />
            <CardTitle>Search & Filter</CardTitle>
            {activeFiltersCount > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search by title, issuer, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white">
                <SelectItem value="all">All Visibility</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timelineFilter} onValueChange={setTimelineFilter}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Timeline" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white">
                <SelectItem value="all">All Timeline Status</SelectItem>
                <SelectItem value="with-timeline">With Timeline</SelectItem>
                <SelectItem value="without-timeline">Without Timeline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 text-white">
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                  <SelectItem value="issuer-asc">Issuer (A-Z)</SelectItem>
                  <SelectItem value="issuer-desc">Issuer (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-white/60">
              Showing {filteredCertifications.length} of {certifications.length}{" "}
              certifications
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Certifications List */}
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Certifications ({filteredCertifications.length})</CardTitle>
          <CardDescription className="text-white/60">
            {filteredCertifications.length === 0
              ? "No certifications match your filters."
              : "Edit or remove certifications below."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredCertifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 mb-2">No certifications found</p>
              <p className="text-white/40 text-sm">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredCertifications.map((certification) => (
              <CertificationAdminCard
                key={certification.id}
                certification={certification}
                hasTimelineEntry={timelineStatusMap[certification.id] ?? false}
                onDelete={async () => {
                  return await onDelete(certification.id);
                }}
                onUpdate={async (data: CertificationFormValues) => {
                  return await onUpdate(certification.id, data);
                }}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}


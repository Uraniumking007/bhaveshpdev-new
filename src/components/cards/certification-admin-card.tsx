"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Certification } from "@prisma/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import {
  certificationSchema,
  CertificationFormValues,
} from "@/lib/validations/admin";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEdit,
  IconTrash,
  IconTimeline,
  IconEye,
  IconEyeOff,
  IconExternalLink,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface CertificationAdminCardProps {
  certification: Certification;
  hasTimelineEntry?: boolean;
  onDelete: () => Promise<{ success: boolean; error?: string }>;
  onUpdate: (
    data: CertificationFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function CertificationAdminCard({
  certification,
  hasTimelineEntry = false,
  onDelete,
  onUpdate,
}: CertificationAdminCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isSaving, startSaveTransition] = useTransition();

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      title: certification.title,
      issuer: certification.issuer,
      date: new Date(certification.date).toISOString().slice(0, 10),
      description: certification.description || "",
      imageUrl: certification.imageUrl || "",
      pdfUrl: certification.pdfUrl || "",
      visible: certification.visible ?? "public",
      addToTimeline: hasTimelineEntry,
    },
  });

  const handleDelete = () => {
    if (!confirm(`Delete ${certification.title}?`)) return;
    startDeleteTransition(async () => {
      const result = await onDelete();
      if (!result.success) {
        toast.error(result.error || "Failed to delete certification");
        return;
      }
      toast.success("Certification deleted");
    });
  };

  const onSubmit = form.handleSubmit((values) => {
    startSaveTransition(async () => {
      const result = await onUpdate(values);
      if (!result.success) {
        toast.error(result.error || "Failed to update certification");
        return;
      }
      toast.success("Certification updated");
      setDialogOpen(false);
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                {certification.imageUrl && (
                  <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={certification.imageUrl}
                      alt={certification.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {certification.title}
                  </CardTitle>
                  <CardDescription className="text-white/70 mt-1">
                    {certification.issuer}
                  </CardDescription>
                  <p className="text-sm text-white/60 mt-1">
                    {new Date(certification.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              {/* Status Badges */}
              <div className="flex gap-2">
                {certification.visible === "public" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                    <IconEye className="w-3 h-3" />
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300 border border-gray-500/30">
                    <IconEyeOff className="w-3 h-3" />
                    Private
                  </span>
                )}
                {hasTimelineEntry && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <IconTimeline className="w-3 h-3" />
                    Timeline
                  </span>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <IconEdit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-white/10 bg-neutral-950 text-white">
                    <DialogHeader>
                      <DialogTitle>Edit certification</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...form.register("title")} />
                        {form.formState.errors.title && (
                          <p className="text-sm text-red-400">
                            {form.formState.errors.title.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="issuer">Issuer</Label>
                        <Input id="issuer" {...form.register("issuer")} />
                        {form.formState.errors.issuer && (
                          <p className="text-sm text-red-400">
                            {form.formState.errors.issuer.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="date">Issued on</Label>
                        <Input
                          id="date"
                          type="date"
                          {...form.register("date")}
                        />
                        {form.formState.errors.date && (
                          <p className="text-sm text-red-400">
                            {form.formState.errors.date.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          {...form.register("description")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image</Label>
                        <ImageUpload
                          folder="certifications"
                          onUploadComplete={(url) =>
                            form.setValue("imageUrl", url, {
                              shouldDirty: true,
                              shouldValidate: true,
                            })
                          }
                        />
                        <Input
                          type="url"
                          placeholder="Or paste an image URL"
                          {...form.register("imageUrl")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pdfUrl">PDF URL</Label>
                        <Input
                          id="pdfUrl"
                          type="url"
                          {...form.register("pdfUrl")}
                        />
                        {form.formState.errors.pdfUrl && (
                          <p className="text-sm text-red-400">
                            {form.formState.errors.pdfUrl.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label>Visibility</Label>
                        <Controller
                          control={form.control}
                          name="visible"
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="mt-1 border-white/10 bg-white/5 text-white">
                                <SelectValue placeholder="Visibility" />
                              </SelectTrigger>
                              <SelectContent className="bg-neutral-900 text-white">
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Controller
                          control={form.control}
                          name="addToTimeline"
                          render={({ field }) => (
                            <Checkbox
                              id="addToTimeline"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white/10 data-[state=checked]:bg-white/10"
                            />
                          )}
                        />
                        <Label
                          htmlFor="addToTimeline"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Add to timeline
                        </Label>
                        {form.formState.errors.addToTimeline && (
                          <p className="text-sm text-red-400">
                            {form.formState.errors.addToTimeline.message}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => {
                            form.reset();
                            setDialogOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="bg-white/10 text-white hover:bg-white/20"
                        >
                          {isSaving ? "Saving..." : "Save changes"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/40 text-red-400 hover:bg-red-500/10"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  <IconTrash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certification.description && (
            <p className="text-white/80 text-sm line-clamp-2">
              {certification.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {certification.pdfUrl && (
              <a
                href={certification.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <IconExternalLink className="w-3.5 h-3.5" />
                View PDF
              </a>
            )}
            {certification.imageUrl && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
                  >
                    Preview Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl border-white/10 bg-neutral-950 text-white">
                  <DialogHeader>
                    <DialogTitle>{certification.title}</DialogTitle>
                  </DialogHeader>
                  <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
                    <Image
                      src={certification.imageUrl}
                      alt={certification.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


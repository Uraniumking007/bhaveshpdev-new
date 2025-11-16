"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createCertification } from "@/app/(admin)/admin/certifications/actions";
import {
  CertificationFormValues,
  certificationSchema,
} from "@/lib/validations/admin";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "../ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { IconCheck, IconX, IconEye } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface CertificationFormProps {
  onSuccess?: () => void;
}

export const CertificationForm = ({
  onSuccess,
}: CertificationFormProps = {}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPreview, setShowPreview] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      issuer: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      imageUrl: "",
      pdfUrl: "",
      visible: "public",
      addToTimeline: true,
    },
  });

  // Watch form values for live preview
  const watchedValues = watch();

  const onSubmit = (values: CertificationFormValues) => {
    startTransition(async () => {
      const result = await createCertification({
        ...values,
      });
      if (!result.success) {
        toast.error(result.error || "Failed to create certification");
        return;
      }

      toast.success("Certification added successfully");
      reset();
      router.refresh();
      onSuccess?.();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Certification Details
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <IconEye className="w-4 h-4 mr-2" />
          {showPreview ? "Hide" : "Show"} Preview
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              Title
              {watchedValues.title && !errors.title && (
                <IconCheck className="w-4 h-4 text-green-400" />
              )}
              {errors.title && <IconX className="w-4 h-4 text-red-400" />}
            </Label>
            <Input
              id="title"
              placeholder="AWS Certified Solutions Architect"
              {...register("title")}
              className={cn(
                "bg-white/5 border-white/10 text-white",
                errors.title && "border-red-500/50",
                watchedValues.title && !errors.title && "border-green-500/50"
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="issuer" className="flex items-center gap-2">
              Issuer
              {watchedValues.issuer && !errors.issuer && (
                <IconCheck className="w-4 h-4 text-green-400" />
              )}
              {errors.issuer && <IconX className="w-4 h-4 text-red-400" />}
            </Label>
            <Input
              id="issuer"
              placeholder="Amazon Web Services"
              {...register("issuer")}
              className={cn(
                "bg-white/5 border-white/10 text-white",
                errors.issuer && "border-red-500/50",
                watchedValues.issuer && !errors.issuer && "border-green-500/50"
              )}
            />
            {errors.issuer && (
              <p className="mt-1 text-sm text-red-400">
                {errors.issuer.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="date" className="flex items-center gap-2">
              Issued on
              {watchedValues.date && !errors.date && (
                <IconCheck className="w-4 h-4 text-green-400" />
              )}
              {errors.date && <IconX className="w-4 h-4 text-red-400" />}
            </Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className={cn(
                "bg-white/5 border-white/10 text-white",
                errors.date && "border-red-500/50",
                watchedValues.date && !errors.date && "border-green-500/50"
              )}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="What skills or achievements does this certification highlight?"
              {...register("description")}
              className="bg-white/5 border-white/10 text-white"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Featured image</Label>
            <ImageUpload
              folder="certifications"
              onUploadComplete={(url) => {
                setValue("imageUrl", url, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            <Input
              type="url"
              placeholder="Or paste an image URL"
              {...register("imageUrl")}
              className={cn(
                "bg-white/5 border-white/10 text-white",
                errors.imageUrl && "border-red-500/50"
              )}
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-400">
                {errors.imageUrl.message}
              </p>
            )}
            {watchedValues.imageUrl && !errors.imageUrl && (
              <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={watchedValues.imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              type="url"
              placeholder="https://example.com/certificate.pdf"
              {...register("pdfUrl")}
              className={cn(
                "bg-white/5 border-white/10 text-white",
                errors.pdfUrl && "border-red-500/50"
              )}
            />
            {errors.pdfUrl && (
              <p className="mt-1 text-sm text-red-400">
                {errors.pdfUrl.message}
              </p>
            )}
          </div>

          <div>
            <Label>Visibility</Label>
            <Controller
              control={control}
              name="visible"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="mt-1 w-full border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 text-white">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.visible && (
              <p className="mt-1 text-sm text-red-400">
                {errors.visible.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={control}
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
            {errors.addToTimeline && (
              <p className="mt-1 text-sm text-red-400">
                {errors.addToTimeline.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending || !isValid}
            className="w-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Add certification"}
          </Button>
        </form>

        {/* Live Preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:sticky lg:top-4 h-fit"
            >
              <Card className="border-white/10 bg-white/5 text-white p-6">
                <h4 className="text-sm font-semibold mb-4 text-white/60">
                  Preview
                </h4>
                <div className="space-y-4">
                  {watchedValues.imageUrl && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={watchedValues.imageUrl}
                        alt={watchedValues.title || "Preview"}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.png";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {watchedValues.title || "Certification Title"}
                    </h3>
                    <p className="text-white/70 mt-1">
                      {watchedValues.issuer || "Issuer Name"}
                    </p>
                    <p className="text-sm text-white/50 mt-1">
                      {watchedValues.date
                        ? new Date(watchedValues.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Date"}
                    </p>
                    {watchedValues.description && (
                      <p className="text-white/80 mt-2 text-sm line-clamp-3">
                        {watchedValues.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                        {watchedValues.visible === "public"
                          ? "Public"
                          : "Private"}
                      </span>
                      {watchedValues.addToTimeline && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">
                          Timeline
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

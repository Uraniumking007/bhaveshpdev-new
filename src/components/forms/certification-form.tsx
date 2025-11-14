"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createCertification } from "@/app/(admin)/admin/certifications";
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

export const CertificationForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
    title: "",
    issuer: "",
      date: new Date().toISOString().slice(0, 10),
    description: "",
    imageUrl: "",
    pdfUrl: "",
    visible: "public",
    },
  });

  const onSubmit = (values: CertificationFormValues) => {
    startTransition(async () => {
      const result = await createCertification({
        ...values,
        date: new Date(values.date),
      });
      if (!result.success) {
        toast.error(result.error || "Failed to create certification");
        return;
      }

      toast.success("Certification added successfully");
      reset();
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="AWS Certified Solutions Architect"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="issuer">Issuer</Label>
        <Input
          id="issuer"
          placeholder="Amazon Web Services"
          {...register("issuer")}
        />
        {errors.issuer && (
          <p className="mt-1 text-sm text-red-400">{errors.issuer.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="date">Issued on</Label>
        <Input id="date" type="date" {...register("date")} />
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
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-400">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pdfUrl">PDF URL</Label>
        <Input
          id="pdfUrl"
          type="url"
          placeholder="https://example.com/certificate.pdf"
          {...register("pdfUrl")}
        />
        {errors.pdfUrl && (
          <p className="mt-1 text-sm text-red-400">{errors.pdfUrl.message}</p>
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
          <p className="mt-1 text-sm text-red-400">{errors.visible.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-white/10 text-white hover:bg-white/20"
      >
        {isPending ? "Saving..." : "Add certification"}
      </Button>
    </form>
  );
};

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createCertification } from "@/app/(admin)/admin/certifications";
import { toast } from "sonner";
import { ImageUpload } from "../ui/image-upload";

interface CertificationFormData {
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
  visible: "public" | "private";
}

export const CertificationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CertificationFormData>({
    title: "",
    issuer: "",
    date: "",
    description: "",
    imageUrl: "",
    pdfUrl: "",
    visible: "public",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createCertification({
        ...formData,
        date: new Date(formData.date),
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create certification");
      }

      toast.success("Certification added successfully");
      setFormData({
        title: "",
        issuer: "",
        date: "",
        description: "",
        imageUrl: "",
        pdfUrl: "",
        visible: "public",
      });
    } catch (error) {
      console.error("Error creating certification:", error);
      toast.error("Failed to create certification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
          placeholder="e.g., AWS Certified Solutions Architect"
        />
      </div>

      <div>
        <label
          htmlFor="issuer"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Issuer
        </label>
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
          placeholder="e.g., Amazon Web Services"
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
          placeholder="Brief description of the certification..."
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Image
        </label>
        <div className="space-y-2">
          <ImageUpload
            onUploadComplete={(url) =>
              setFormData({ ...formData, imageUrl: url })
            }
            folder="certifications"
          />
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-white/50",
              "focus:outline-none focus:ring-2 focus:ring-white/20"
            )}
            placeholder="Or enter image URL directly"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="pdfUrl"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          PDF URL
        </label>
        <input
          type="url"
          id="pdfUrl"
          name="pdfUrl"
          value={formData.pdfUrl}
          onChange={handleChange}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-white/20"
          )}
          placeholder="URL to the PDF certificate"
        />
      </div>

      <div>
        <label
          htmlFor="visible"
          className="block text-sm font-medium text-white/90 mb-1"
        >
          Visibility
        </label>
        <select
          id="visible"
          name="visible"
          value={formData.visible}
          onChange={handleChange}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/20",
            "[&>option]:bg-neutral-900 [&>option]:text-white"
          )}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full px-4 py-2 rounded-lg",
          "bg-white/10 hover:bg-white/20",
          "text-white font-medium",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isLoading ? "Adding..." : "Add Certification"}
      </button>
    </form>
  );
};

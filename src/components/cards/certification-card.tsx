"use client";

import { useState } from "react";
import { Certification } from "@prisma/client";
import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { toast } from "sonner";

interface CertificationCardProps {
  data: Certification;
  onDelete: () => Promise<void>;
  onUpdate: (data: {
    title: string;
    issuer: string;
    date: Date;
    description?: string;
    imageUrl?: string;
    credentialUrl?: string;
    pdfUrl?: string;
  }) => Promise<void>;
}

export const CertificationCard = ({
  data,
  onDelete,
  onUpdate,
}: CertificationCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: data.title,
    issuer: data.issuer,
    date: new Date(data.date).toISOString().split("T")[0],
    description: data.description || "",
    imageUrl: data.imageUrl || "",
    credentialUrl: data.credentialUrl || "",
    pdfUrl: data.pdfUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onUpdate({
        ...formData,
        date: new Date(formData.date),
      });
      setIsEditing(false);
      toast.success("Certification updated successfully");
    } catch (error) {
      console.error("Error updating certification:", error);
      toast.error("Failed to update certification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this certification?")) {
      return;
    }

    setIsLoading(true);
    try {
      await onDelete();
      toast.success("Certification deleted successfully");
    } catch (error) {
      console.error("Error deleting certification:", error);
      toast.error("Failed to delete certification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-lg p-4 space-y-4 border border-white/10"
      >
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
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-white/90 mb-1"
          >
            Image URL
          </label>
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
          />
        </div>

        <div>
          <label
            htmlFor="credentialUrl"
            className="block text-sm font-medium text-white/90 mb-1"
          >
            Credential URL
          </label>
          <input
            type="url"
            id="credentialUrl"
            name="credentialUrl"
            value={formData.credentialUrl}
            onChange={handleChange}
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
            htmlFor="pdfUrl"
            className="block text-sm font-medium text-white/90 mb-1"
          >
            PDF URL (Optional)
          </label>
          <input
            type="url"
            id="pdfUrl"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-white/50",
              "focus:outline-none focus:ring-2 focus:ring-white/20"
            )}
            placeholder="URL to the PDF certificate if credential URL is not available"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-white/10 hover:bg-white/20",
              "text-white font-medium",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-white/5 hover:bg-white/10",
              "text-white font-medium",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/5 p-6",
        "hover:bg-white/10 transition-all duration-300",
        "backdrop-blur-sm"
      )}
    >
      <div className="flex flex-col gap-4">
        {data.imageUrl && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-white">{data.title}</h3>
          <p className="text-white/70">{data.issuer}</p>
          <p className="text-sm text-white/50">
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>

          {data.description && (
            <p className="text-white/80 mt-2">{data.description}</p>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {data.credentialUrl && (
              <a
                href={data.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                View Credential
                <IconExternalLink className="w-4 h-4" />
              </a>
            )}
            {data.pdfUrl && (
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                View PDF Certificate
                <IconExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
          className={cn(
            "px-3 py-1 text-sm",
            "bg-white/10 hover:bg-white/20",
            "text-white rounded-lg",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={cn(
            "px-3 py-1 text-sm",
            "bg-red-500/10 hover:bg-red-500/20",
            "text-red-400 rounded-lg",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

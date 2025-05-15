"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { IconUpload } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  className?: string;
  folder?: string;
}

export function ImageUpload({
  onUploadComplete,
  className,
  folder = "projects",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={cn(
          "w-full bg-white/10 hover:bg-white/20 text-white",
          "transition-all duration-300",
          "flex items-center justify-center gap-2"
        )}
      >
        <IconUpload className="w-5 h-5" />
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Certification } from "@prisma/client";
import { motion } from "framer-motion";
import { IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { CertificateModal } from "../ui/certificate-modal";

interface CertificationViewerCardProps {
  certification: Certification;
}

export const CertificationViewerCard = ({
  certification,
}: CertificationViewerCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative rounded-2xl border border-white/10 bg-white/5 p-6",
          "hover:bg-white/10 transition-all duration-300",
          "backdrop-blur-sm",
          "flex flex-col h-full"
        )}
      >
        <div className="flex flex-col gap-4 flex-grow">
          {certification.imageUrl && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                src={certification.imageUrl}
                alt={certification.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-white">
              {certification.title}
            </h3>
            <p className="text-white/70">{certification.issuer}</p>
            <p className="text-sm text-white/50">
              {new Date(certification.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>

            {certification.description && (
              <p className="text-white/80 mt-2 line-clamp-2">
                {certification.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {certification.description && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 text-sm",
                "text-white/70 hover:text-white",
                "transition-colors duration-200"
              )}
            >
              Read More
              <IconArrowRight className="w-4 h-4" />
            </button>
          )}
          {certification.pdfUrl && (
            <a
              href={certification.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              View PDF Certificate
              <IconExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>

      <CertificateModal
        certification={certification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

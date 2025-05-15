"use client";

import { Certification } from "@prisma/client";
import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface CertificationViewerCardProps {
  certification: Certification;
}

export const CertificationViewerCard = ({
  certification,
}: CertificationViewerCardProps) => {
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
            <p className="text-white/80 mt-2">{certification.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
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
        </div>
      </div>
    </motion.div>
  );
};

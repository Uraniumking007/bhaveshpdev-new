"use client";

import { useState } from "react";
import type { Certification } from "@/types/static-data";
import { motion } from "framer-motion";
import { IconExternalLink, IconArrowRight, IconBadge } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { CertificateModal } from "../ui/certificate-modal";

interface CertificationViewerCardProps {
  certification: Certification;
  index?: number;
}

export const CertificationViewerCard = ({
  certification,
  index = 0,
}: CertificationViewerCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if certification is recent (within last 6 months)
  const isRecent =
    new Date(certification.date).getTime() >
    Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "group relative rounded-2xl border border-white/10 bg-white/5 p-6",
          "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
          "backdrop-blur-sm",
          "flex flex-col h-full",
          "overflow-hidden"
        )}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Recent badge */}
        {isRecent && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 z-10"
          >
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm">
              <IconBadge className="w-3 h-3" />
              Recent
            </span>
          </motion.div>
        )}

        <div className="flex flex-col gap-4 flex-grow relative z-10">
          {certification.imageUrl && (
            <motion.div
              className="relative w-full h-48 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={certification.imageUrl}
                alt={certification.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )}

          <div className="flex flex-col gap-2">
            <motion.h3
              className="text-xl font-semibold text-white"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {certification.title}
            </motion.h3>
            <p className="text-white/70 font-medium">{certification.issuer}</p>
            <p className="text-sm text-white/50">
              {new Date(certification.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {certification.description && (
              <motion.p
                className="text-white/80 mt-2 line-clamp-2"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {certification.description}
              </motion.p>
            )}
          </div>
        </div>

        <motion.div
          className="mt-auto pt-4 flex flex-wrap gap-2 relative z-10"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {certification.description && (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-2 text-sm",
                "text-white/70 hover:text-white",
                "transition-colors duration-200",
                "px-3 py-1.5 rounded-lg",
                "bg-white/5 hover:bg-white/10"
              )}
            >
              Read More
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <IconArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}
          {certification.pdfUrl && (
            <motion.a
              href={certification.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              View PDF
              <IconExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      <CertificateModal
        certification={certification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

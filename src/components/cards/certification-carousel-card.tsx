import type { Certification } from "@/types/static-data";
import { motion } from "framer-motion";
import { IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { CertificateModal } from "../ui/certificate-modal";
import { useState } from "react";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='system-ui' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

interface CertificationCarouselCardProps {
  certification: Certification;
}

export const CertificationCarouselCard = ({
  certification,
}: CertificationCarouselCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.03, y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "group relative rounded-xl border border-white/10 bg-white/5 p-4",
          "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
          "backdrop-blur-sm",
          "flex flex-col h-full",
          "min-w-[280px] sm:min-w-[320px]",
          "overflow-hidden"
        )}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className="flex flex-col gap-3 flex-grow relative z-10">
          {certification.imageUrl && (
            <motion.div
              className="relative w-full h-32 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={
                  imageLoadFailed
                    ? PLACEHOLDER_IMAGE
                    : certification.imageUrl
                }
                alt={certification.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageLoadFailed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )}

          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold text-white line-clamp-1">
              {certification.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-1">
              {certification.issuer}
            </p>
            <p className="text-xs text-white/50">
              {new Date(certification.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>

        <motion.div
          className="mt-auto pt-3 flex flex-wrap gap-2 relative z-10"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {certification.description && (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs",
                "text-white/70 hover:text-white",
                "transition-colors duration-200",
                "px-2.5 py-1 rounded-md",
                "bg-white/5 hover:bg-white/10"
              )}
            >
              Details
              <IconArrowRight className="w-3 h-3" />
            </motion.button>
          )}
          {certification.pdfUrl && (
            <motion.a
              href={certification.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              PDF
              <IconExternalLink className="w-3 h-3" />
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


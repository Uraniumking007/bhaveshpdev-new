"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Certification } from "@prisma/client";
import { IconX, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";

interface CertificateModalProps {
  certification: Certification;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal = ({
  certification,
  isOpen,
  onClose,
}: CertificateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl border border-white/10 p-6 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <IconX className="w-5 h-5 text-white/70" />
              </button>

              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2 pr-8">
                  <h2 className="text-2xl font-bold text-white">
                    {certification.title}
                  </h2>
                  <p className="text-white/70">{certification.issuer}</p>
                  <p className="text-sm text-white/50">
                    {new Date(certification.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Image */}
                {certification.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full h-64 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={certification.imageUrl}
                      alt={certification.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}

                {/* Description */}
                {certification.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert max-w-none"
                  >
                    <p className="text-white/80 leading-relaxed">
                      {certification.description}
                    </p>
                  </motion.div>
                )}

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 pt-4"
                >
                  {certification.pdfUrl && (
                    <a
                      href={certification.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                        "bg-white/10 hover:bg-white/20",
                        "text-white font-medium",
                        "transition-colors duration-200"
                      )}
                    >
                      View PDF Certificate
                      <IconExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

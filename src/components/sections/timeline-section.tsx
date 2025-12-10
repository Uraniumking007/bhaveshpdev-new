"use client";

import { motion } from "framer-motion";
import { Timeline as PrismaTimeline } from "@prisma/client";
import { Timeline as AceternityTimeline } from "@/components/ui/timeline";
import { TextGenerateEffect } from "../text-generate-effect";

export default function TimelineSection({
  timelineData,
}: {
  timelineData: PrismaTimeline[];
}) {
  const heading = (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-white"
      >
        Experience & Education
      </motion.h2>
      <TextGenerateEffect
        className="text-base md:text-lg text-neutral-600 dark:text-neutral-300"
        words="My journey through education and professional experience, marked by continuous learning and growth."
      />
    </div>
  );

  const timelineEntries =
    timelineData?.map((item, index) => {
      const dateLabel =
        item.yearStart && (item.yearEnd || item.ongoing)
          ? `${item.yearStart} - ${item.ongoing ? "Present" : item.yearEnd}`
          : item.yearStart || item.yearEnd || "Timeline";

      const typeLabel = item.type
        ? item.type
            .replace(/[_-]+/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
        : null;

      return {
        title: dateLabel,
        content: (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-3xl border border-neutral-200/70 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] p-6 md:p-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                <span>{dateLabel}</span>
                {typeLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/70 dark:border-neutral-700 px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-white/60 dark:bg-neutral-900/80">
                    {typeLabel}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {item.title ?? "Untitled milestone"}
              </h3>
              {item.description && (
                <p className="text-neutral-600 dark:text-neutral-300 hidden md:block leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ),
      };
    }) ?? [];

  return (
    <section className="w-screen bg-white dark:bg-neutral-950">
      <AceternityTimeline headingContent={heading} data={timelineEntries} />
    </section>
  );
}

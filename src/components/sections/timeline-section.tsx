"use client";

import { motion } from "framer-motion";
import { HeroHighlight } from "../hero-highlight";
import { TextGenerateEffect } from "../text-generate-effect";

const timelineData = [
  {
    year: "2023",
    title: "Computer Engineering Student",
    description: "Currently pursuing Computer Engineering degree",
    type: "education",
  },
  {
    year: "2022",
    title: "Web Development Intern",
    description: "Worked on frontend development using React and Next.js",
    type: "experience",
  },
  {
    year: "2021",
    title: "Started Programming Journey",
    description: "Began learning web development and programming fundamentals",
    type: "milestone",
  },
];

const TimelineSection = () => {
  return (
    <HeroHighlight>
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-neutral-700 dark:text-white"
        >
          Experience & Education
        </motion.h2>
        <TextGenerateEffect
          className="text-center mb-12 text-neutral-600 dark:text-neutral-300"
          words="My journey through education and professional experience, marked by continuous learning and growth."
        />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/50 dark:bg-blue-600/50" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-600" />
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/50 rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-neutral-700 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default TimelineSection;

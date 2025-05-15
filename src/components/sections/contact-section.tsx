"use client";

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { HeroHighlight } from "../hero-highlight";
import { TextGenerateEffect } from "../text-generate-effect";
import { TooltipButton } from "../Buttons/tooltip-button";
import { useFormState } from "react-dom";
import { submitContactForm } from "./contact-actions";
import { LitupBorderButton } from "../Buttons/litup-border-button";
import { IconLoader } from "@tabler/icons-react";

const contactInfo = [
  {
    id: 0,
    title: "G-Mail",
    description: "contact@bhaveshp.dev",
    icon: "/icons/outline/brand-gmail.svg",
    link: "mailto:contact@bhaveshp.dev",
  },
  {
    id: 1,
    title: "Discord",
    description: "discord.gg/smCjSmMw9D",
    icon: "/icons/outline/brand-discord.svg",
    link: "https://discord.gg/smCjSmMw9D",
  },
  {
    id: 2,
    title: "X formerly Twitter",
    description: "twitter.com/UraniumKing0",
    icon: "/icons/outline/brand-x.svg",
    link: "https://twitter.com/UraniumKing0",
  },
  {
    id: 3,
    title: "Github",
    description: "github.com/Uraniumking007",
    icon: "/icons/outline/brand-github.svg",
    link: "https://github.com/Uraniumking007",
  },
];

const ContactSection = () => {
  const [formState, formAction] = useFormState(submitContactForm, {
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  return (
    <HeroHighlight>
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-neutral-700 dark:text-white"
        >
          Get in Touch
        </motion.h2>
        <TextGenerateEffect
          className="text-center mb-12 text-neutral-600 dark:text-neutral-300"
          words="Have a question or want to work together? Feel free to reach out!"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            >
              <form
                action={async (formData) => {
                  setSubmitted(false);
                  startTransition(() => {
                    formAction(formData);
                    setSubmitted(true);
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <LitupBorderButton
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <IconLoader className="animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </LitupBorderButton>
                {formState.success && submitted && (
                  <div className="text-green-600 mt-2">
                    Message sent successfully!
                  </div>
                )}
                {!formState.success && submitted && (
                  <div className="text-red-600 mt-2">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-neutral-700 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-300">
                  Feel free to reach out to me through the contact form or using
                  the following methods:
                </p>
                <div className="flex flex-row gap-4 items-center justify-center mt-6 w-full">
                  <TooltipButton items={contactInfo} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default ContactSection;

import { motion } from "framer-motion";
import { useState } from "react";
import { HeroHighlight } from "../hero-highlight";
import { TextGenerateEffect } from "../text-generate-effect";
import { TooltipButton } from "../Buttons/tooltip-button";
import { LitupBorderButton } from "../Buttons/litup-border-button";
import { IconLoader, IconCheck } from "@tabler/icons-react";

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
    title: "X",
    description: "x.com/UraniumKing0",
    icon: "/icons/outline/brand-x.svg",
    link: "https://x.com/UraniumKing0",
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        e.currentTarget.reset();
      } else {
        setSuccess(false);
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSuccess(false);
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-fit min-h-screen">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field to deter bots */}
                <input
                  type="text"
                  name="company"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="hidden"
                  autoComplete="off"
                />
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
                <LitupBorderButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <IconLoader className="animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </LitupBorderButton>
                {submitted && success && (
                  <div className="flex items-center gap-2 text-green-600 mt-2" aria-live="polite">
                    <IconCheck size={16} />
                    <span>Message sent successfully!</span>
                  </div>
                )}
                {submitted && !success && error && (
                  <div className="text-red-600 mt-2" aria-live="assertive">
                    {error}
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
    </div>
  );
};

export default ContactSection;

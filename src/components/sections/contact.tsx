"use client";

import { motion, Variants } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ContactInfo {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const contactDetails: ContactInfo[] = [
  {
    title: "Phone",
    value: "8287549367",
    description: "Call us for instant support",
    icon: Phone,
    href: "tel:8287549367",
  },
  {
    title: "Email",
    value: "support@s2atutoring.com",
    description: "Send us your queries anytime",
    icon: Mail,
    href: "mailto:support@s2atutoring.com",
  },
  {
    title: "Location",
    value: "Delhi NCR, India",
    description: "Serving all major areas",
    icon: MapPin,
    href: "#",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/60 to-sky-50/40 dark:from-blue-950/20 dark:to-sky-950/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-sky-100/40 to-blue-50/30 dark:from-sky-950/15 dark:to-blue-950/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200 dark:border-blue-800"
          >
            Contact Us
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;re here to help you find the perfect tutor
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {contactDetails.map((detail) => {
            const Icon = detail.icon;
            return (
              <motion.a
                key={detail.title}
                href={detail.href}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group block"
              >
                <div
                  className={cn(
                    "relative flex flex-col items-center text-center p-8 rounded-2xl",
                    "bg-white/70 dark:bg-slate-800/40",
                    "backdrop-blur-xl",
                    "border border-gray-100 dark:border-slate-700/50",
                    "hover:border-blue-200 dark:hover:border-blue-800/60",
                    "hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/5",
                    "transition-all duration-300"
                  )}
                >
                  {/* Icon Circle */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-16 h-16 rounded-full",
                        "bg-gradient-to-br from-blue-600 to-sky-400",
                        "shadow-lg shadow-blue-500/25",
                        "group-hover:shadow-blue-500/40",
                        "transition-shadow duration-300"
                      )}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {detail.title}
                  </h3>

                  {/* Value */}
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                    {detail.value}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {detail.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Call Now */}
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="tel:8287549367"
            className={cn(
              "inline-flex items-center justify-center gap-2.5 w-full sm:w-auto",
              "px-8 py-4 rounded-xl",
              "bg-gradient-to-r from-blue-600 to-blue-500",
              "text-white font-semibold text-base",
              "shadow-lg shadow-blue-500/25",
              "hover:shadow-xl hover:shadow-blue-500/35",
              "transition-shadow duration-300"
            )}
          >
            <Phone className="w-5 h-5" />
            Call Now
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/918287549367"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2.5 w-full sm:w-auto",
              "px-8 py-4 rounded-xl",
              "bg-gradient-to-r from-green-600 to-green-500",
              "text-white font-semibold text-base",
              "shadow-lg shadow-green-500/25",
              "hover:shadow-xl hover:shadow-green-500/35",
              "transition-shadow duration-300"
            )}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.a>

          {/* Email Us */}
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:support@s2atutoring.com"
            className={cn(
              "inline-flex items-center justify-center gap-2.5 w-full sm:w-auto",
              "px-8 py-4 rounded-xl",
              "border-2 border-blue-600 dark:border-sky-400",
              "text-blue-600 dark:text-sky-400 font-semibold text-base",
              "hover:bg-blue-50 dark:hover:bg-blue-950/30",
              "transition-colors duration-300"
            )}
          >
            <Mail className="w-5 h-5" />
            Email Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

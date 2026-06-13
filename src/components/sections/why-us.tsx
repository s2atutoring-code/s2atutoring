"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Clock,
  IndianRupee,
  BarChart3,
  Gift,
  HeartHandshake,
  Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  {
    title: "Verified Tutors",
    icon: ShieldCheck,
    description:
      "All tutors undergo thorough background verification and skill assessment",
  },
  {
    title: "Personalized Matching",
    icon: Target,
    description:
      "AI-powered tutor matching based on student's learning style and goals",
  },
  {
    title: "Flexible Timings",
    icon: Clock,
    description:
      "Choose class timings that fit your schedule perfectly",
  },
  {
    title: "Affordable Pricing",
    icon: IndianRupee,
    description:
      "Quality education at competitive and transparent pricing",
  },
  {
    title: "Regular Progress Reports",
    icon: BarChart3,
    description:
      "Detailed monthly reports tracking academic improvement",
  },
  {
    title: "Free Demo Classes",
    icon: Gift,
    description:
      "Try before you commit with complimentary demo sessions",
  },
  {
    title: "Parent Support",
    icon: HeartHandshake,
    description:
      "Dedicated parent coordinator for seamless communication",
  },
  {
    title: "Quality Assurance",
    icon: Award,
    description:
      "Continuous monitoring to ensure highest teaching standards",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 rounded-full blur-3xl opacity-60" />
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
            Our Promise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              S2A Tutoring
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We deliver excellence in education with a commitment to every
            student&apos;s success
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div
                  className={cn(
                    "relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl",
                    "bg-white dark:bg-slate-800/40",
                    "border border-gray-100 dark:border-slate-700/50",
                    "hover:border-blue-200 dark:hover:border-blue-800/60",
                    "hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/5",
                    "transition-all duration-300",
                    "backdrop-blur-sm"
                  )}
                >
                  {/* Icon Circle */}
                  <div className="relative mb-5">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-14 h-14 rounded-full",
                        "bg-gradient-to-br from-blue-600 to-sky-400",
                        "shadow-lg shadow-blue-500/25",
                        "group-hover:shadow-blue-500/40",
                        "transition-shadow duration-300"
                      )}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

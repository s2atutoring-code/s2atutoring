"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import {
  Home,
  Monitor,
  Award,
  Trophy,
  Languages,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  hoverBorder: string;
}

const services: Service[] = [
  {
    icon: Home,
    title: "Home Tuition",
    description:
      "One-on-one personalized learning at your doorstep. Our verified tutors come to your home for focused, distraction-free sessions.",
    gradient: "from-blue-500 to-blue-600",
    hoverBorder: "group-hover:border-blue-400/40 dark:group-hover:border-blue-400/30",
  },
  {
    icon: Monitor,
    title: "Online Tuition",
    description:
      "Live interactive classes from anywhere. High-quality video sessions with screen sharing, digital whiteboard, and recorded lectures.",
    gradient: "from-sky-400 to-cyan-500",
    hoverBorder: "group-hover:border-sky-400/40 dark:group-hover:border-sky-400/30",
  },
  {
    icon: Award,
    title: "Board Exam Preparation",
    description:
      "Expert preparation for CBSE, ICSE & State Boards. Structured study plans, past paper practice, and exam-focused strategies.",
    gradient: "from-violet-500 to-purple-600",
    hoverBorder: "group-hover:border-violet-400/40 dark:group-hover:border-violet-400/30",
  },
  {
    icon: Trophy,
    title: "Competitive Exams",
    description:
      "Crack JEE, NEET, CUET & Olympiads with expert mentors. Concept-first approach with extensive problem-solving practice.",
    gradient: "from-amber-400 to-orange-500",
    hoverBorder: "group-hover:border-amber-400/40 dark:group-hover:border-amber-400/30",
  },
  {
    icon: Languages,
    title: "Language Learning",
    description:
      "Master English, Hindi & Sanskrit with native-speaking tutors. Focus on grammar, spoken fluency, and literature appreciation.",
    gradient: "from-emerald-400 to-green-500",
    hoverBorder: "group-hover:border-emerald-400/40 dark:group-hover:border-emerald-400/30",
  },
  {
    icon: Lightbulb,
    title: "Skill Development",
    description:
      "Coding, Communication & Public Speaking. Future-ready skills taught through hands-on projects and real-world applications.",
    gradient: "from-rose-400 to-pink-500",
    hoverBorder: "group-hover:border-rose-400/40 dark:group-hover:border-rose-400/30",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="services"
      ref={sectionRef}
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden",
        "bg-white dark:bg-slate-950"
      )}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-400/5 dark:bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4",
              "bg-blue-100/80 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
              "border border-blue-200/60 dark:border-blue-500/20"
            )}
          >
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive education solutions tailored to every student&apos;s
            needs
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                className={cn(
                  "group relative flex flex-col p-8 rounded-2xl cursor-default",
                  "bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl",
                  "border border-gray-200/60 dark:border-white/[0.08]",
                  service.hoverBorder,
                  "shadow-lg shadow-gray-200/30 dark:shadow-black/20",
                  "hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10",
                  "transition-all duration-300"
                )}
              >
                {/* Gradient glow behind card on hover */}
                <div
                  className={cn(
                    "absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity duration-500",
                    service.gradient
                  )}
                  style={{ opacity: undefined }}
                />
                {/* Re-overlay background so glow only shows at edges */}
                <div className="absolute inset-[1px] rounded-[15px] bg-white dark:bg-slate-950 -z-[5]" />

                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg mb-6",
                    "group-hover:shadow-xl transition-shadow duration-300",
                    service.gradient
                  )}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Learn more link */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-semibold",
                      "text-gray-400 dark:text-slate-500",
                      "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                      "transition-colors duration-300"
                    )}
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

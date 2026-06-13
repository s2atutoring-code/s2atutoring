"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  MessageSquare,
  Users,
  PlayCircle,
  Calendar,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Requirement Discussion",
    description:
      "Share your learning goals and preferences with our education counselor",
    icon: MessageSquare,
  },
  {
    number: 2,
    title: "Tutor Matching",
    description:
      "We handpick the best tutor from our verified network based on your needs",
    icon: Users,
  },
  {
    number: 3,
    title: "Free Demo Class",
    description:
      "Experience a complimentary trial session with your matched tutor",
    icon: PlayCircle,
  },
  {
    number: 4,
    title: "Regular Classes",
    description:
      "Begin your personalized learning journey with scheduled sessions",
    icon: Calendar,
  },
  {
    number: 5,
    title: "Progress Monitoring",
    description:
      "Track improvement with regular assessments and feedback reports",
    icon: TrendingUp,
  },
];

const stepVariants: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const mobileStepVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

function TimelineStep({
  step,
  index,
}: {
  step: Step;
  index: number;
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;
  const direction = isEven ? "left" : "right";

  return (
    <div className="relative">
      {/* Desktop Layout: alternating sides */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center">
        {/* Left content */}
        <div className={cn("flex", isEven ? "justify-end" : "justify-end")}>
          {isEven ? (
            <motion.div
              custom={direction}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-md"
            >
              <StepCard step={step} align="right" />
            </motion.div>
          ) : (
            <div />
          )}
        </div>

        {/* Center circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="relative z-10"
        >
          <div
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full",
              "bg-gradient-to-br from-blue-600 to-sky-400",
              "shadow-lg shadow-blue-500/30",
              "ring-4 ring-white dark:ring-slate-950"
            )}
          >
            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Right content */}
        <div className={cn("flex", !isEven ? "justify-start" : "justify-start")}>
          {!isEven ? (
            <motion.div
              custom={direction}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-md"
            >
              <StepCard step={step} align="left" />
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Mobile Layout: all on the right of the line */}
      <div className="flex md:hidden gap-4 items-start">
        {/* Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="relative z-10 shrink-0"
        >
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full",
              "bg-gradient-to-br from-blue-600 to-sky-400",
              "shadow-lg shadow-blue-500/30",
              "ring-4 ring-slate-50 dark:ring-slate-950"
            )}
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={mobileStepVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex-1 pb-12"
        >
          <StepCard step={step} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

function StepCard({
  step,
  align,
}: {
  step: Step;
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "relative p-5 sm:p-6 rounded-2xl",
        "bg-white dark:bg-slate-800/50",
        "border border-gray-100 dark:border-slate-700/50",
        "shadow-sm hover:shadow-lg hover:shadow-blue-500/5",
        "transition-all duration-300 group",
        align === "right" ? "text-right" : "text-left"
      )}
    >
      {/* Step number badge */}
      <span
        className={cn(
          "inline-block px-2.5 py-0.5 mb-2 text-xs font-bold rounded-full",
          "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-sky-400",
          "border border-blue-100 dark:border-blue-800"
        )}
      >
        Step {step.number}
      </span>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-sky-100/20 dark:bg-sky-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200 dark:border-blue-800"
          >
            Simple Process
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your journey to finding the perfect tutor in 5 simple steps
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Desktop: center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px]">
            {/* Background track */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700/50 rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-sky-400 rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile: left line */}
          <div className="md:hidden absolute left-[23px] top-0 bottom-0 w-[3px]">
            {/* Background track */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700/50 rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-sky-400 rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="relative space-y-8 md:space-y-16">
            {steps.map((step, index) => (
              <TimelineStep key={step.number} step={step} index={index} />
            ))}
          </div>

          {/* End dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.3 }}
            className={cn(
              "hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2",
              "w-8 h-8 rounded-full items-center justify-center",
              "bg-gradient-to-br from-blue-600 to-sky-400",
              "shadow-lg shadow-blue-500/30",
              "ring-4 ring-white dark:ring-slate-950"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

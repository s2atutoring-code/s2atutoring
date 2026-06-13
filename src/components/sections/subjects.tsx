"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface Subject {
  name: string;
  emoji: string;
}

const subjects: Subject[] = [
  { name: "Mathematics", emoji: "📐" },
  { name: "Science", emoji: "🔬" },
  { name: "Physics", emoji: "⚛️" },
  { name: "Chemistry", emoji: "🧪" },
  { name: "Biology", emoji: "🧬" },
  { name: "English", emoji: "📚" },
  { name: "Hindi", emoji: "📖" },
  { name: "Sanskrit", emoji: "📜" },
  { name: "Computer Science", emoji: "💻" },
  { name: "Economics", emoji: "📊" },
  { name: "Accounts", emoji: "🧮" },
  { name: "Business Studies", emoji: "📈" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function SubjectsSection() {
  return (
    <section
      id="subjects"
      className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/30 dark:bg-sky-900/10 rounded-full blur-3xl" />
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
            Comprehensive Curriculum
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Subjects We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Cover
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert tutors available for all major subjects across all boards
          </p>
        </motion.div>

        {/* Subjects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Gradient border on hover */}
              <div
                className={cn(
                  "absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300",
                  "bg-gradient-to-br from-blue-500 to-sky-400",
                  "group-hover:opacity-100"
                )}
              />

              {/* Card content */}
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center gap-3 p-6 sm:p-8",
                  "rounded-2xl bg-white dark:bg-slate-800/50",
                  "border border-gray-200/80 dark:border-slate-700/50",
                  "group-hover:border-transparent",
                  "group-hover:shadow-lg group-hover:shadow-blue-500/10",
                  "transition-all duration-300 cursor-pointer",
                  "backdrop-blur-sm"
                )}
              >
                <span
                  className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110"
                  role="img"
                  aria-label={subject.name}
                >
                  {subject.emoji}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-center">
                  {subject.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-10 text-sm text-gray-500 dark:text-gray-500"
        >
          Can&apos;t find your subject?{" "}
          <a
            href="#contact"
            className="text-blue-600 dark:text-sky-400 font-medium hover:underline"
          >
            Contact us
          </a>{" "}
          — we likely have a tutor for it.
        </motion.p>
      </div>
    </section>
  );
}

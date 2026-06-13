"use client";

import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { label: "Verified Tutors", icon: CheckCircle2 },
  { label: "Personalized Learning", icon: CheckCircle2 },
  { label: "Home Tuition", icon: CheckCircle2 },
  { label: "Affordable Fees", icon: CheckCircle2 },
  { label: "Delhi NCR Coverage", icon: CheckCircle2 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const badgeContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 1.0 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function FloatingOrb({
  className,
  delay = 0,
  duration = 20,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none",
        className
      )}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-white via-blue-50/60 to-white",
        "dark:bg-gradient-to-b dark:from-slate-950 dark:via-blue-950 dark:to-slate-950"
      )}
    >
      {/* ── Floating gradient orbs ── */}
      <FloatingOrb
        className="w-[500px] h-[500px] bg-blue-400/40 dark:bg-blue-500/30 -top-40 -left-40"
        delay={0}
        duration={22}
      />
      <FloatingOrb
        className="w-[400px] h-[400px] bg-sky-300/40 dark:bg-sky-400/25 top-1/4 right-[-10%]"
        delay={3}
        duration={18}
      />
      <FloatingOrb
        className="w-[350px] h-[350px] bg-indigo-300/30 dark:bg-indigo-500/20 bottom-10 left-1/4"
        delay={5}
        duration={25}
      />
      <FloatingOrb
        className="w-[250px] h-[250px] bg-cyan-300/30 dark:bg-cyan-400/20 top-1/2 left-[60%]"
        delay={2}
        duration={20}
      />

      {/* ── Subtle grid overlay ── */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjMiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40 dark:opacity-20 pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Text content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pill badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  "bg-blue-100/80 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
                  "border border-blue-200/60 dark:border-blue-500/20",
                  "backdrop-blur-sm"
                )}
              >
                <GraduationCap className="w-4 h-4" />
                #1 Home Tuition Platform in Delhi NCR
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]",
                "text-gray-900 dark:text-white"
              )}
            >
              Find the Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                Home Tutor
              </span>{" "}
              in Delhi NCR
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className={cn(
                "mt-6 text-lg sm:text-xl max-w-2xl",
                "text-gray-600 dark:text-slate-300/90",
                "lg:text-left mx-auto lg:mx-0"
              )}
            >
              Personalized one-to-one home tuition for school students, board
              exams, competitive exams, and skill development.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold",
                  "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25",
                  "hover:shadow-xl hover:shadow-blue-500/30 transition-shadow duration-300"
                )}
              >
                <Phone className="w-5 h-5" />
                Book Free Demo Class
              </motion.a>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold",
                  "border-2 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-slate-200",
                  "hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400",
                  "transition-colors duration-300 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                )}
              >
                Find a Tutor
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              variants={badgeContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {badges.map((badge) => (
                <motion.span
                  key={badge.label}
                  variants={badgeVariants}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium",
                    "bg-white/70 dark:bg-white/10 text-gray-700 dark:text-slate-300",
                    "border border-gray-200/60 dark:border-white/10 backdrop-blur-sm"
                  )}
                >
                  <badge.icon className="w-3.5 h-3.5 text-green-500" />
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Decorative illustration area ── */}
          <motion.div
            className="flex-1 hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-sky-400/20 to-indigo-500/20 dark:from-blue-500/10 dark:via-sky-400/10 dark:to-indigo-500/10 blur-2xl" />

              {/* Main glass card */}
              <div
                className={cn(
                  "absolute inset-4 rounded-3xl",
                  "bg-white/60 dark:bg-white/5 backdrop-blur-xl",
                  "border border-white/40 dark:border-white/10",
                  "shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5",
                  "flex flex-col items-center justify-center gap-6 p-8"
                )}
              >
                {/* Icon grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { Icon: GraduationCap, color: "from-blue-500 to-blue-600", label: "Expert Tutors" },
                    { Icon: BookOpen, color: "from-sky-400 to-cyan-500", label: "All Subjects" },
                    { Icon: Star, color: "from-amber-400 to-orange-500", label: "Top Rated" },
                    { Icon: MapPin, color: "from-emerald-400 to-green-500", label: "Delhi NCR" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                          item.color
                        )}
                      >
                        <item.Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-slate-400">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom stat */}
                <div className="mt-2 text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    500+
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Happy Students
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

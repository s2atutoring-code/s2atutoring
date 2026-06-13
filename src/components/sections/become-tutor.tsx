"use client";

import { motion, Variants } from "framer-motion";
import { Clock, Wallet, GraduationCap, Headphones, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Set your own hours and work at your convenience",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/25",
  },
  {
    icon: Wallet,
    title: "Excellent Earnings",
    description: "Earn competitive compensation for your expertise",
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    icon: GraduationCap,
    title: "Premium Students",
    description: "Teach motivated students from quality families",
    color: "from-violet-500 to-violet-600",
    shadow: "shadow-violet-500/25",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get full support from our operations team",
    color: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-500/25",
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

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
  },
};

export default function BecomeTutor() {
  return (
    <section
      id="become-tutor"
      className="relative py-20 md:py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold tracking-wide mb-4">
            Join Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Tutor at{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              S2A
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our elite network of educators and make a difference
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Left: Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="group relative flex items-start gap-5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                      benefit.color,
                      benefit.shadow
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600" />

              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 right-6 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute bottom-10 left-6 w-20 h-20 border-2 border-white rounded-full" />
                <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-white rounded-full" />
              </div>

              <div className="relative p-8 md:p-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs font-medium mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Now Hiring
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Ready to Inspire the Next Generation?
                </h3>

                <p className="text-blue-100/80 mb-8 leading-relaxed text-sm">
                  Share your knowledge, build your career, and transform
                  students&apos; lives. We&apos;re looking for passionate
                  educators to join our growing team across Delhi NCR.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-xs text-blue-200">Active Tutors</p>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-white">₹40K+</p>
                    <p className="text-xs text-blue-200">Avg. Monthly</p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#tutor-form"
                  className="group/btn inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-base shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:bg-blue-50 transition-all duration-300"
                >
                  Apply as Tutor
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

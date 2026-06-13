"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Users, GraduationCap, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
  gradient: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Students Taught",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: GraduationCap,
    value: 200,
    suffix: "+",
    label: "Expert Tutors",
    color: "text-sky-500",
    gradient: "from-sky-400 to-cyan-500",
  },
  {
    icon: Star,
    value: 95,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "text-amber-500",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: BookOpen,
    value: 10,
    suffix: "+",
    label: "Subjects Covered",
    color: "text-emerald-500",
    gradient: "from-emerald-400 to-green-500",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat }: { stat: StatItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, 2000, hasIntersected);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "group relative flex flex-col items-center gap-4 p-8 rounded-2xl text-center",
        "bg-white/70 dark:bg-white/5 backdrop-blur-xl",
        "border border-gray-200/50 dark:border-white/10",
        "shadow-lg shadow-gray-200/30 dark:shadow-black/20",
        "hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10",
        "hover:border-blue-200/60 dark:hover:border-blue-500/20",
        "transition-shadow duration-300"
      )}
    >
      {/* Background glow on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br",
          stat.gradient,
          "blur-xl -z-10 scale-95"
        )}
        style={{ opacity: 0 }}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md",
          stat.gradient
        )}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-0.5">
        <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tabular-nums">
          {count}
        </span>
        <span
          className={cn(
            "text-2xl sm:text-3xl font-bold",
            stat.color
          )}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
        {stat.label}
      </p>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden",
        "bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50",
        "dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Hundreds
            </span>{" "}
            of Families
          </h2>
          <p className="mt-4 text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
            Our numbers speak for the quality and trust we have built over the years.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Parent",
    text: "S2A Tutoring transformed my daughter's academic performance. Her math scores improved from 65 to 94 in just three months. The tutor is incredibly patient and knowledgeable.",
    stars: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Class 12 Student",
    text: "The physics tutor from S2A made complex concepts so easy to understand. I cleared JEE Mains with a great score thanks to their guidance.",
    stars: 5,
  },
  {
    id: 3,
    name: "Anita Gupta",
    role: "Parent",
    text: "Finding a reliable home tutor was always a challenge until we discovered S2A. The personalized attention my son receives has boosted his confidence tremendously.",
    stars: 5,
  },
  {
    id: 4,
    name: "Vikash Kumar",
    role: "Class 10 Student",
    text: "My board exam preparation became so much more organized with S2A's structured approach. I scored 95% in my CBSE boards!",
    stars: 5,
  },
  {
    id: 5,
    name: "Meera Reddy",
    role: "Parent",
    text: "The flexibility of scheduling and the quality of tutors at S2A is unmatched. Our experience has been exceptional from day one.",
    stars: 5,
  },
  {
    id: 6,
    name: "Arjun Singh",
    role: "College Student",
    text: "S2A's CUET preparation classes were exactly what I needed. The tutor's expertise and the personalized study plan made all the difference.",
    stars: 5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine how many cards to show based on breakpoint
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount
  );

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/30 dark:bg-sky-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold tracking-wide mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Parents & Students{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied families who trust S2A Tutoring
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards container */}
          <div className="overflow-hidden px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={cn(
                  "grid gap-6",
                  visibleCount === 1 && "grid-cols-1",
                  visibleCount === 2 && "grid-cols-2",
                  visibleCount === 3 && "grid-cols-3"
                )}
              >
                {visibleTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col"
                  >
                    {/* Quote icon */}
                    <div className="mb-5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-lg shadow-blue-500/25">
                        <Quote className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed flex-1 text-[15px]">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200/60 dark:border-white/10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {getInitials(t.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-8 h-3 bg-gradient-to-r from-blue-600 to-sky-400"
                  : "w-3 h-3 bg-gray-300 dark:bg-slate-600 hover:bg-blue-400 dark:hover:bg-blue-500"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

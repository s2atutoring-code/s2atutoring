"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does tutor matching work?",
    answer:
      "Our education counselors understand your child's learning needs, academic level, and preferences. We then match them with the most suitable tutor from our verified network based on subject expertise, teaching style, location, and availability.",
  },
  {
    question: "Is the demo class really free?",
    answer:
      "Yes, absolutely! We offer a completely free demo class with no obligations. This allows you and your child to experience our teaching quality before making any commitment.",
  },
  {
    question: "What are the tuition fees?",
    answer:
      "Our fees vary based on the subject, class level, and frequency of sessions. We offer competitive and transparent pricing starting from ₹500/hour. Contact us for a personalized quote.",
  },
  {
    question: "Are all tutors verified?",
    answer:
      "Yes, every tutor in our network undergoes thorough background verification, qualification checks, and teaching ability assessments before being approved.",
  },
  {
    question: "Can I change my tutor?",
    answer:
      "Absolutely! If you feel the current tutor isn't the right fit, we'll provide a replacement tutor within 24-48 hours at no additional cost.",
  },
  {
    question: "What areas do you cover in Delhi NCR?",
    answer:
      "We cover all major areas including Delhi, Noida, Greater Noida, Ghaziabad, Gurgaon, and Faridabad with door-to-door home tuition services.",
  },
  {
    question: "Do you offer online tuition?",
    answer:
      "Yes! We offer both home tuition and online tuition options. Our online classes are conducted via interactive video sessions with screen sharing and digital whiteboard.",
  },
  {
    question: "What boards do you cover?",
    answer:
      "We provide expert tutoring for CBSE, ICSE, State Boards, IB, and IGCSE curricula across all subjects and grade levels.",
  },
  {
    question: "How do you track student progress?",
    answer:
      "We provide monthly progress reports, regular assessments, and parent-teacher meetings to ensure continuous academic improvement.",
  },
  {
    question: "What is the minimum commitment?",
    answer:
      "There is no long-term commitment required. You can start with a monthly plan and continue as long as you're satisfied with our services.",
  },
  {
    question: "Do you help with competitive exam preparation?",
    answer:
      "Yes, we have specialized tutors for JEE, NEET, CUET, NDA, Olympiads, and other competitive examinations with proven track records.",
  },
  {
    question: "How quickly can a tutor start?",
    answer:
      "After the free demo class and confirmation, regular classes can typically begin within 24-48 hours.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
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

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={itemVariants} className="group">
      <div
        className={cn(
          "rounded-2xl border transition-all duration-300",
          "bg-white/70 dark:bg-slate-800/40",
          "backdrop-blur-sm",
          isOpen
            ? "border-blue-200 dark:border-blue-800/60 shadow-lg shadow-blue-500/5"
            : "border-gray-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800/40"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "text-base sm:text-lg font-semibold transition-colors duration-200",
              isOpen
                ? "text-blue-600 dark:text-sky-400"
                : "text-gray-900 dark:text-white"
            )}
          >
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isOpen
                  ? "text-blue-600 dark:text-sky-400"
                  : "text-gray-400 dark:text-gray-500"
              )}
            />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.25, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800/50 to-transparent mb-4" />
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Generate FAQ Schema JSON-LD
function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* FAQ Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema()),
        }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-50 to-transparent dark:from-sky-950/10 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-blue-50 to-transparent dark:from-blue-950/10 dark:to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
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
            Got Questions?
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our tutoring services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-3"
        >
          {faqItems.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{" "}
            <a
              href="#contact"
              className="font-semibold text-blue-600 dark:text-sky-400 hover:underline underline-offset-4 transition-colors"
            >
              Get in touch with us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

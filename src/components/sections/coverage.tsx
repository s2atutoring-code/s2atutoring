"use client";

import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  {
    name: "Delhi",
    areas:
      "All areas including South Delhi, North Delhi, East Delhi, West Delhi & Central Delhi",
    coordinates: { x: 195, y: 175 },
  },
  {
    name: "Noida",
    areas: "Sectors 1-168, Noida Extension & surrounding areas",
    coordinates: { x: 300, y: 220 },
  },
  {
    name: "Greater Noida",
    areas:
      "Knowledge Park, Pari Chowk, Alpha, Beta, Gamma & Delta sectors",
    coordinates: { x: 345, y: 310 },
  },
  {
    name: "Ghaziabad",
    areas:
      "Indirapuram, Vaishali, Kaushambi, Raj Nagar & Crossings Republik",
    coordinates: { x: 310, y: 130 },
  },
  {
    name: "Gurgaon",
    areas:
      "DLF, Sohna Road, Golf Course Road, Sector 1-115 & New Gurgaon",
    coordinates: { x: 90, y: 260 },
  },
  {
    name: "Faridabad",
    areas:
      "Old Faridabad, NIT, Greater Faridabad & Ballabhgarh",
    coordinates: { x: 220, y: 330 },
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function DelhiNCRMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto"
    >
      <svg
        viewBox="0 0 450 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background glow */}
        <defs>
          <radialGradient
            id="mapGlow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Map background blob */}
        <ellipse
          cx="225"
          cy="210"
          rx="200"
          ry="190"
          fill="url(#mapGlow)"
        />

        {/* Abstract region shapes */}
        {/* Delhi region */}
        <path
          d="M160 140 C175 120, 220 115, 235 135 C250 155, 245 200, 230 215 C215 230, 175 225, 160 210 C145 195, 145 160, 160 140Z"
          fill="#2563EB"
          fillOpacity="0.12"
          stroke="#2563EB"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          className="dark:fill-blue-400/15 dark:stroke-blue-400/30"
        />

        {/* Gurgaon region */}
        <path
          d="M60 225 C75 210, 115 205, 130 220 C145 235, 140 275, 125 290 C110 305, 75 300, 60 285 C45 270, 45 240, 60 225Z"
          fill="#38BDF8"
          fillOpacity="0.1"
          stroke="#38BDF8"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          className="dark:fill-sky-400/12 dark:stroke-sky-400/25"
        />

        {/* Noida region */}
        <path
          d="M265 190 C280 175, 330 175, 340 195 C350 215, 340 250, 325 260 C310 270, 270 265, 260 250 C250 235, 250 205, 265 190Z"
          fill="#6366F1"
          fillOpacity="0.1"
          stroke="#6366F1"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          className="dark:fill-indigo-400/12 dark:stroke-indigo-400/25"
        />

        {/* Ghaziabad region */}
        <path
          d="M275 95 C290 80, 340 85, 350 105 C360 125, 350 155, 335 165 C320 175, 285 170, 275 155 C265 140, 260 110, 275 95Z"
          fill="#22C55E"
          fillOpacity="0.1"
          stroke="#22C55E"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          className="dark:fill-green-400/12 dark:stroke-green-400/25"
        />

        {/* Faridabad region */}
        <path
          d="M185 300 C200 285, 250 285, 260 305 C270 325, 260 355, 245 365 C230 375, 195 370, 185 355 C175 340, 170 315, 185 300Z"
          fill="#F59E0B"
          fillOpacity="0.1"
          stroke="#F59E0B"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          className="dark:fill-amber-400/12 dark:stroke-amber-400/25"
        />

        {/* Greater Noida region */}
        <path
          d="M310 280 C325 268, 375 272, 385 290 C395 308, 385 340, 370 350 C355 360, 320 355, 310 340 C300 325, 295 295, 310 280Z"
          fill="#EC4899"
          fillOpacity="0.1"
          stroke="#EC4899"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          className="dark:fill-pink-400/12 dark:stroke-pink-400/25"
        />

        {/* Connection lines */}
        <g stroke="#2563EB" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-blue-400/15">
          <line x1="195" y1="175" x2="300" y2="220" />
          <line x1="195" y1="175" x2="310" y2="130" />
          <line x1="195" y1="175" x2="90" y2="260" />
          <line x1="195" y1="175" x2="220" y2="330" />
          <line x1="300" y1="220" x2="345" y2="310" />
          <line x1="300" y1="220" x2="310" y2="130" />
          <line x1="90" y1="260" x2="220" y2="330" />
        </g>

        {/* City dots with glow + labels */}
        {locations.map((loc) => (
          <g key={loc.name}>
            {/* Outer pulse ring */}
            <circle
              cx={loc.coordinates.x}
              cy={loc.coordinates.y}
              r="14"
              fill="#2563EB"
              fillOpacity="0.08"
              className="dark:fill-blue-400/10"
            >
              <animate
                attributeName="r"
                values="14;22;14"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.08;0.02;0.08"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Dot */}
            <circle
              cx={loc.coordinates.x}
              cy={loc.coordinates.y}
              r="6"
              fill="#2563EB"
              filter="url(#dotGlow)"
              className="dark:fill-sky-400"
            />
            <circle
              cx={loc.coordinates.x}
              cy={loc.coordinates.y}
              r="3"
              fill="white"
            />
            {/* Label */}
            <text
              x={loc.coordinates.x}
              y={loc.coordinates.y - 16}
              textAnchor="middle"
              className="fill-gray-700 dark:fill-gray-300 text-[11px] font-semibold"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {loc.name}
            </text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export default function Coverage() {
  return (
    <section
      id="coverage"
      className="relative py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/20 dark:bg-sky-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-sm font-semibold tracking-wide mb-4">
            Service Area
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Coverage{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Area
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Premium home tuition services across Delhi NCR
          </p>
        </motion.div>

        {/* Map + Cards layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* SVG Map */}
          <div className="order-2 lg:order-1">
            <DelhiNCRMap />
          </div>

          {/* Location Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {locations.map((loc) => (
              <motion.div
                key={loc.name}
                variants={cardVariants}
                className={cn(
                  "group relative rounded-2xl p-5 transition-all duration-300 cursor-default",
                  "border border-gray-100 dark:border-white/5",
                  "bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl",
                  "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10",
                  "hover:border-blue-200 dark:hover:border-blue-800/40"
                )}
              >
                {/* Subtle blue glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/5 group-hover:to-sky-500/5 transition-all duration-300 pointer-events-none" />

                <div className="relative flex items-start gap-3">
                  {/* Pin icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {loc.areas}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Don&apos;t see your area?{" "}
            <a
              href="#contact"
              className="text-blue-600 dark:text-sky-400 font-semibold hover:underline"
            >
              Contact us
            </a>{" "}
            — we&apos;re expanding rapidly across NCR.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

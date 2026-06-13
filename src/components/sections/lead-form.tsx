"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLead } from "@/actions/lead";

const leadFormSchema = z.object({
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Name is too long"),
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address"),
  grade: z.string().min(1, "Please select a class/grade"),
  subject: z.string().min(1, "Please select a subject"),
  location: z.string().min(1, "Please select a location"),
  preferredTiming: z.string().min(1, "Please select a preferred timing"),
  message: z.string().max(500, "Message is too long").optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const gradeOptions = [
  "Nursery-UKG",
  "1-5",
  "6-8",
  "9-10",
  "11-12",
  "College",
  "Competitive Exam",
];

const subjectOptions = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Sanskrit",
  "Computer Science",
  "Economics",
  "Accounts",
  "Business Studies",
  "Other",
];

const locationOptions = [
  "Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Gurgaon",
  "Faridabad",
  "Other",
];

const timingOptions = [
  "Morning 8-12",
  "Afternoon 12-4",
  "Evening 4-8",
  "Night 8-10",
  "Flexible",
];

const inputClasses = cn(
  "w-full px-4 py-3 rounded-xl text-sm",
  "bg-white/80 dark:bg-slate-800/60",
  "border border-gray-200 dark:border-slate-700/60",
  "text-gray-900 dark:text-white",
  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-sky-500",
  "transition-all duration-200",
  "backdrop-blur-sm"
);

const selectClasses = cn(
  inputClasses,
  "appearance-none cursor-pointer",
  "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]",
  "bg-[length:12px] bg-[right_16px_center] bg-no-repeat"
);

const labelClasses =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

const errorClasses = "mt-1 text-xs text-red-500 dark:text-red-400";

export default function LeadFormSection() {
  const [isPending, startTransition] = useTransition();
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      phone: "",
      email: "",
      grade: "",
      subject: "",
      location: "",
      preferredTiming: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = (data: LeadFormData) => {
    // Honeypot check
    if (data.honeypot) return;

    setSubmitState("idle");
    setErrorMessage("");

    startTransition(async () => {
      try {
        const result = await submitLead(data);
        if (result?.success) {
          setSubmitState("success");
          reset();
        } else {
          setSubmitState("error");
          setErrorMessage(
            result?.message || "Something went wrong. Please try again."
          );
        }
      } catch {
        setSubmitState("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <section
      id="lead-form"
      className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-sky-50 to-blue-50 dark:from-sky-950/15 dark:to-blue-950/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200 dark:border-blue-800"
          >
            Free Demo Class
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Book Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Free Demo Class
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fill in your details and we&apos;ll match you with the perfect tutor
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div
            className={cn(
              "relative rounded-3xl p-8 sm:p-10",
              "bg-white/70 dark:bg-slate-800/30",
              "backdrop-blur-xl",
              "border border-gray-100 dark:border-slate-700/50",
              "shadow-xl shadow-gray-200/40 dark:shadow-black/20"
            )}
          >
            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  {/* Success Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="relative mb-6"
                  >
                    {/* Confetti-like particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0],
                          x: Math.cos((i * Math.PI) / 4) * 60,
                          y: Math.sin((i * Math.PI) / 4) * 60,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + i * 0.05,
                          ease: "easeOut",
                        }}
                        className={cn(
                          "absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2",
                          i % 3 === 0
                            ? "bg-blue-500"
                            : i % 3 === 1
                            ? "bg-sky-400"
                            : "bg-green-500"
                        )}
                      />
                    ))}
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg shadow-green-500/30">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    Request Submitted!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm"
                  >
                    Our team will contact you within 2 hours to schedule your
                    free demo class.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setSubmitState("idle")}
                    className="text-sm font-medium text-blue-600 dark:text-sky-400 hover:underline underline-offset-4 cursor-pointer"
                  >
                    Submit another request
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {/* Row 1: Student + Parent Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="studentName" className={labelClasses}>
                        Student Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="studentName"
                        type="text"
                        placeholder="Enter student's name"
                        className={cn(
                          inputClasses,
                          errors.studentName &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("studentName")}
                      />
                      {errors.studentName && (
                        <p className={errorClasses}>
                          {errors.studentName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="parentName" className={labelClasses}>
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="parentName"
                        type="text"
                        placeholder="Enter parent's name"
                        className={cn(
                          inputClasses,
                          errors.parentName &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("parentName")}
                      />
                      {errors.parentName && (
                        <p className={errorClasses}>
                          {errors.parentName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={cn(
                          inputClasses,
                          errors.phone &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className={errorClasses}>{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className={cn(
                          inputClasses,
                          errors.email &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className={errorClasses}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Grade + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="grade" className={labelClasses}>
                        Class / Grade <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="grade"
                        className={cn(
                          selectClasses,
                          errors.grade &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("grade")}
                      >
                        <option value="">Select class/grade</option>
                        {gradeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.grade && (
                        <p className={errorClasses}>{errors.grade.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="subject" className={labelClasses}>
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        className={cn(
                          selectClasses,
                          errors.subject &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("subject")}
                      >
                        <option value="">Select subject</option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className={errorClasses}>
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Location + Timing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="location" className={labelClasses}>
                        Location <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="location"
                        className={cn(
                          selectClasses,
                          errors.location &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("location")}
                      >
                        <option value="">Select location</option>
                        {locationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                        <p className={errorClasses}>
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="preferredTiming" className={labelClasses}>
                        Preferred Timing{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferredTiming"
                        className={cn(
                          selectClasses,
                          errors.preferredTiming &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("preferredTiming")}
                      >
                        <option value="">Select timing</option>
                        {timingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTiming && (
                        <p className={errorClasses}>
                          {errors.preferredTiming.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message{" "}
                      <span className="text-gray-400 dark:text-gray-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Any specific requirements or questions..."
                      className={cn(inputClasses, "resize-none")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className={errorClasses}>{errors.message.message}</p>
                    )}
                  </div>

                  {/* Honeypot - hidden from users */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true">
                    <label htmlFor="honeypot">
                      Leave this field empty
                    </label>
                    <input
                      id="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("honeypot")}
                    />
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {submitState === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: isPending ? 1 : 1.01 }}
                    whileTap={{ scale: isPending ? 1 : 0.98 }}
                    className={cn(
                      "w-full flex items-center justify-center gap-2.5",
                      "px-8 py-4 rounded-xl",
                      "bg-gradient-to-r from-blue-600 to-sky-500",
                      "text-white font-semibold text-base",
                      "shadow-lg shadow-blue-500/25",
                      "hover:shadow-xl hover:shadow-blue-500/35",
                      "disabled:opacity-70 disabled:cursor-not-allowed",
                      "transition-shadow duration-300",
                      "cursor-pointer"
                    )}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Free Demo
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                    By submitting, you agree to our terms of service and privacy
                    policy.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

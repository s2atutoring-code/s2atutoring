"use client";

import { useState, useTransition, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  FileText,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitTutor } from "@/actions/tutor";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const tutorFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address"),
  qualification: z.string().min(1, "Please select your qualification"),
  experience: z.string().min(1, "Please select your experience"),
  subjects: z
    .string()
    .min(2, "Please enter at least one subject")
    .max(200, "Too many subjects"),
  location: z.string().min(1, "Please select a location"),
  message: z.string().max(500, "Message is too long").optional().or(z.literal("")),
});

type TutorFormData = z.infer<typeof tutorFormSchema>;

const qualificationOptions = [
  "B.Ed",
  "M.Ed",
  "B.Tech",
  "M.Tech",
  "B.Sc",
  "M.Sc",
  "BA",
  "MA",
  "PhD",
  "Other",
];

const experienceOptions = [
  "Fresher",
  "1-2 Years",
  "2-5 Years",
  "5-10 Years",
  "10+ Years",
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

export default function TutorFormSection() {
  const [isPending, startTransition] = useTransition();
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TutorFormData>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      qualification: "",
      experience: "",
      subjects: "",
      location: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError("Please upload a PDF, DOC, or DOCX file");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 5MB");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: TutorFormData) => {
    setSubmitState("idle");
    setErrorMessage("");

    startTransition(async () => {
      try {
        // Upload file first if present
        let resumeUrl = "";
        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          if (!uploadRes.ok) {
            throw new Error("File upload failed");
          }
          const uploadData = await uploadRes.json();
          resumeUrl = uploadData.url || "";
        }

        const result = await submitTutor({ ...data, resumeUrl });
        if (result?.success) {
          setSubmitState("success");
          reset();
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
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
      id="tutor-form"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/15 dark:to-blue-950/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-blue-50 to-sky-50 dark:from-blue-950/15 dark:to-sky-950/10 rounded-full blur-3xl opacity-60" />
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
            Join Our Team
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Apply as a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Tutor
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our network of expert educators
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
                    Application Submitted!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm"
                  >
                    Thank you for your interest! Our team will review your
                    application and contact you within 48 hours.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setSubmitState("idle")}
                    className="text-sm font-medium text-blue-600 dark:text-sky-400 hover:underline underline-offset-4 cursor-pointer"
                  >
                    Submit another application
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                  }}
                  noValidate
                  className="space-y-5"
                >
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className={labelClasses}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className={cn(
                          inputClasses,
                          errors.fullName &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <p className={errorClasses}>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="tutorPhone" className={labelClasses}>
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="tutorPhone"
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
                  </div>

                  {/* Row 2: Email + Qualification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="tutorEmail" className={labelClasses}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="tutorEmail"
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
                    <div>
                      <label htmlFor="qualification" className={labelClasses}>
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="qualification"
                        className={cn(
                          selectClasses,
                          errors.qualification &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("qualification")}
                      >
                        <option value="">Select qualification</option>
                        {qualificationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.qualification && (
                        <p className={errorClasses}>
                          {errors.qualification.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Experience + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="experience" className={labelClasses}>
                        Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experience"
                        className={cn(
                          selectClasses,
                          errors.experience &&
                            "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                        )}
                        {...register("experience")}
                      >
                        <option value="">Select experience</option>
                        {experienceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.experience && (
                        <p className={errorClasses}>
                          {errors.experience.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="tutorLocation" className={labelClasses}>
                        Location <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="tutorLocation"
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
                  </div>

                  {/* Subjects */}
                  <div>
                    <label htmlFor="subjects" className={labelClasses}>
                      Subjects You Can Teach{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subjects"
                      type="text"
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      className={cn(
                        inputClasses,
                        errors.subjects &&
                          "border-red-300 dark:border-red-700 focus:ring-red-500/40"
                      )}
                      {...register("subjects")}
                    />
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      Separate multiple subjects with commas
                    </p>
                    {errors.subjects && (
                      <p className={errorClasses}>{errors.subjects.message}</p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className={labelClasses}>Resume Upload</label>
                    <div
                      className={cn(
                        "relative rounded-xl border-2 border-dashed p-6 text-center",
                        "transition-all duration-200",
                        fileError
                          ? "border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/10"
                          : selectedFile
                          ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/10"
                          : "border-gray-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 bg-white/60 dark:bg-slate-800/40"
                      )}
                    >
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-8 h-8 text-blue-500" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Click to upload resume
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    {fileError && (
                      <p className={errorClasses}>{fileError}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="tutorMessage" className={labelClasses}>
                      Message{" "}
                      <span className="text-gray-400 dark:text-gray-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="tutorMessage"
                      rows={3}
                      placeholder="Tell us about your teaching experience..."
                      className={cn(inputClasses, "resize-none")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className={errorClasses}>{errors.message.message}</p>
                    )}
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
                        Submit Application
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

"use client";

import { GraduationCap, Phone, Mail, MapPin, Heart } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "#home" },
    { name: "Why Choose Us", href: "#why-us" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Coverage Area", href: "#coverage" },
    { name: "FAQ", href: "#faq" },
  ],
  services: [
    { name: "Home Tuition", href: "#services" },
    { name: "Online Tuition", href: "#services" },
    { name: "Board Exam Prep", href: "#services" },
    { name: "Competitive Exams", href: "#services" },
    { name: "Language Learning", href: "#services" },
    { name: "Skill Development", href: "#services" },
  ],
  subjects: [
    { name: "Mathematics", href: "#subjects" },
    { name: "Science", href: "#subjects" },
    { name: "Physics", href: "#subjects" },
    { name: "Chemistry", href: "#subjects" },
    { name: "English", href: "#subjects" },
    { name: "Computer Science", href: "#subjects" },
  ],
};

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                S2A{" "}
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Tutoring
                </span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Premium home tuition services in Delhi NCR. Connecting students
              with verified, experienced tutors for personalized learning
              excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:9717331001"
                className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-blue-950 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                9717331001
              </a>
              <a
                href="mailto:s2atutoring@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-blue-950 flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                s2atutoring@gmail.com
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                Delhi NCR, India
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Subjects
            </h3>
            <ul className="space-y-3">
              {footerLinks.subjects.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; 2026 S2A Tutoring. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-slate-500">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in Delhi NCR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

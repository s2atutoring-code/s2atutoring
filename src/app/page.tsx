import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Subjects from "@/components/sections/subjects";
import WhyUs from "@/components/sections/why-us";
import Process from "@/components/sections/process";

// Dynamic imports for heavier sections (code splitting)
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const BecomeTutor = dynamic(() => import("@/components/sections/become-tutor"));
const Coverage = dynamic(() => import("@/components/sections/coverage"));
const FAQ = dynamic(() => import("@/components/sections/faq"));
const LeadForm = dynamic(() => import("@/components/sections/lead-form"));
const TutorForm = dynamic(() => import("@/components/sections/tutor-form"));
const Contact = dynamic(() => import("@/components/sections/contact"));

const WhatsAppButton = dynamic(
  () =>
    import("@/components/shared/whatsapp-button").then(
      (mod) => mod.WhatsAppButton
    )
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="overflow-hidden">
        <Hero />
        <Stats />
        <Services />
        <Subjects />
        <WhyUs />
        <Process />
        <Testimonials />
        <BecomeTutor />
        <Coverage />
        <FAQ />
        <LeadForm />
        <TutorForm />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://s2atutoring.com"
  ),
  title: {
    default:
      "S2A Tutoring - Premium Home Tuition Services in Delhi NCR",
    template: "%s | S2A Tutoring",
  },
  description:
    "Find the best home tutors in Delhi NCR. S2A Tutoring offers personalized one-on-one home tuition for school students, board exams (CBSE, ICSE), competitive exams (JEE, NEET, CUET), and skill development. 500+ verified tutors, 95% satisfaction rate.",
  keywords: [
    "Home Tutor in Delhi",
    "Home Tuition Delhi NCR",
    "Best Home Tutors Delhi",
    "Private Tutor Delhi",
    "Home Tuition Services NCR",
    "CBSE Tutor Delhi",
    "ICSE Tutor Delhi",
    "JEE Tutor Delhi",
    "NEET Tutor Delhi",
    "Home Tuition Noida",
    "Home Tuition Gurgaon",
    "Home Tutor Near Me",
    "Online Tuition Delhi",
    "Math Tutor Delhi",
    "Science Tutor Delhi NCR",
  ],
  authors: [{ name: "S2A Tutoring" }],
  creator: "S2A Tutoring",
  publisher: "S2A Tutoring",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "S2A Tutoring",
    title: "S2A Tutoring - Premium Home Tuition Services in Delhi NCR",
    description:
      "Find the best home tutors in Delhi NCR. Personalized one-on-one home tuition for all subjects and boards. 500+ verified tutors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "S2A Tutoring - Premium Home Tuition Services in Delhi NCR",
    description:
      "Find the best home tutors in Delhi NCR. Personalized one-on-one home tuition for all subjects and boards.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Schema Markup
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://s2atutoring.com/#business",
      name: "S2A Tutoring",
      description:
        "Premium home tuition services in Delhi NCR offering personalized one-on-one tutoring for school students, board exams, and competitive exams.",
      url: "https://s2atutoring.com",
      telephone: "+918287549367",
      email: "support@s2atutoring.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressRegion: "Delhi NCR",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Greater Noida" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "City", name: "Gurgaon" },
        { "@type": "City", name: "Faridabad" },
      ],
      priceRange: "₹₹",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://s2atutoring.com/#org",
      name: "S2A Tutoring",
      url: "https://s2atutoring.com",
      description:
        "Leading home tuition agency in Delhi NCR providing verified, experienced tutors for personalized learning.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-[family-name:var(--font-inter)] antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

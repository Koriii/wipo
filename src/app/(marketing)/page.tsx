import type { Metadata } from "next";
import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Security,
  CTA,
  Footer,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "WIPO PDF Viewer | Secure Document Access for IP Professionals",
  description:
    "Access and download WIPO Madrid Protocol provisional refusal documents securely. Enterprise-grade authentication, organized by IRN, with instant search and one-click downloads.",
  keywords: [
    "WIPO",
    "PDF viewer",
    "Madrid Protocol",
    "provisional refusal",
    "trademark documents",
    "intellectual property",
    "IRN",
    "document management",
  ],
  authors: [{ name: "WIPO PDF Viewer" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wipo-pdf-viewer.com",
    siteName: "WIPO PDF Viewer",
    title: "WIPO PDF Viewer | Secure Document Access for IP Professionals",
    description:
      "Access and download WIPO Madrid Protocol provisional refusal documents securely. Enterprise-grade authentication with instant search.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WIPO PDF Viewer - Secure Document Access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WIPO PDF Viewer | Secure Document Access",
    description:
      "Access and download WIPO Madrid Protocol provisional refusal documents securely.",
    images: ["/og-image.png"],
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

// Force static generation for the landing page
export const dynamic = "force-static";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

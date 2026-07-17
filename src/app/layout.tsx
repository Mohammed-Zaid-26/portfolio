import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import profile from "@/data/profile.json";
import Analytics from "@/components/Analytics";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://mohammedzaid.dev";
const title = `${profile.name} — ${profile.titles.join(" | ")}`;
const description = profile.positioning;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Mohammed Zaid",
    "Business Analyst",
    "Product Manager",
    "Product Owner",
    "Entrepreneur",
    "Qedence",
    "Digital Transformation",
    "Healthcare Technology",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: profile.email,
  jobTitle: profile.titles.join(" | "),
  address: profile.location,
  sameAs: [profile.linkedin],
  description: profile.positioning,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className="bg-paper-50 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import profile from "@/data/profile.json";
import Analytics from "@/components/Analytics";
import { SHOW_QEDENCE, visibleTitles } from "@/lib/visibility";

// Headings and the hero name
const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
});

// Body copy and small labels
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = "https://zaid26-portfolio.vercel.app";
const title = `${profile.name} | ${visibleTitles.join(" | ")}`;
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
    ...(SHOW_QEDENCE ? ["Entrepreneur", "Qedence"] : []),
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
  jobTitle: visibleTitles.join(" | "),
  address: profile.location,
  sameAs: [profile.linkedin],
  description: profile.positioning,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
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

"use client";

import { ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import certifications from "@/data/certifications.json";

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" tint>
      <Reveal className="max-w-3xl">
        <p className="kicker">Learning Journey</p>
        <h2 className="section-heading mt-4">
          Continuously certified, <span className="text-gradient">continuously learning</span>.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div className="absolute left-0 top-3 h-[calc(100%-2.5rem)] w-px bg-ink-950/10 sm:left-1" />

        <div className="space-y-1">
          {certifications.map((cert, i) => {
            const Wrapper = cert.link ? "a" : "div";
            return (
              <Reveal key={cert.name} index={i} variant={i % 2 === 0 ? "left" : "right"} className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-6 h-2 w-2 rounded-full bg-ink-950/30 sm:left-1" />
                <Wrapper
                  {...(cert.link ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex items-center justify-between gap-4 rounded-lg py-5 ${
                    cert.link ? "hover:bg-ink-950/[0.02]" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
                      {String(i + 1).padStart(2, "0")} · {cert.org}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-ink-950">{cert.name}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {cert.link && (
                    <ExternalLink size={16} className="shrink-0 text-ink-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  )}
                </Wrapper>
                {i < certifications.length - 1 && <div className="rule" />}
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

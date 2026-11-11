"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import certifications from "@/data/certifications.json";

const BADGE_ACCENTS = [
  "bg-electric-500/10 text-electric-600 border-electric-500/20",
  "bg-vital-500/10 text-vital-600 border-vital-500/20",
  "bg-signal-500/10 text-signal-600 border-signal-500/20",
  "bg-deepblue-600/10 text-deepblue-600 border-deepblue-600/20",
];

const TRACK = [...certifications, ...certifications];

export default function Certifications() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const positionRef = useRef(0);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = trackRef.current;
    if (!el) return;

    let frame: number;
    const speed = 0.5;

    const step = () => {
      if (!pausedRef.current) {
        const singleWidth = el.scrollWidth / 2;
        positionRef.current += speed;
        if (positionRef.current >= singleWidth) {
          positionRef.current -= singleWidth;
        }
        el.scrollLeft = positionRef.current;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  function resumeFromCurrentPosition() {
    if (trackRef.current) positionRef.current = trackRef.current.scrollLeft;
    pausedRef.current = false;
  }

  function pauseTemporarily() {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(resumeFromCurrentPosition, 2600);
  }

  function scrollByCards(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
    pauseTemporarily();
  }

  return (
    <SectionWrapper id="certifications">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal className="max-w-3xl">
          <p className="kicker">Learning Journey</p>
          <h2 className="section-heading mt-4">
            Continuously certified, <span className="text-highlight">continuously evolving</span>.
          </h2>
        </Reveal>

        <Reveal className="flex gap-2">
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll certifications left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/10 bg-paper-50 text-ink-600 transition-colors duration-200 hover:border-ink-950/25 hover:text-ink-950"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Scroll certifications right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/10 bg-paper-50 text-ink-600 transition-colors duration-200 hover:border-ink-950/25 hover:text-ink-950"
          >
            <ChevronRight size={16} />
          </button>
        </Reveal>
      </div>

      <Reveal variant="blur" className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper-200 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper-200 to-transparent sm:w-24" />

        <div
          ref={trackRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={resumeFromCurrentPosition}
          onTouchStart={() => (pausedRef.current = true)}
          onTouchEnd={pauseTemporarily}
          className="flex gap-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TRACK.map((cert, i) => {
            const accent = BADGE_ACCENTS[i % BADGE_ACCENTS.length];
            return (
              <motion.div
                key={`${cert.name}-${i}`}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group w-64 shrink-0 rounded-3xl border border-ink-950/10 bg-paper-50 p-6 shadow-[0_4px_20px_-16px_rgba(20,22,26,0.3)] transition-shadow duration-300 hover:border-ink-950/20 hover:shadow-[0_24px_48px_-24px_rgba(20,22,26,0.28)] sm:w-72"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accent}`}>
                  <Award size={20} />
                </span>

                <p className="mt-5 font-display text-lg font-medium leading-snug text-ink-950">{cert.name}</p>
                <p className="mt-1.5 text-sm text-ink-500">{cert.org}</p>

                <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100">
                  <div className="flex flex-wrap gap-1.5 border-t border-ink-950/10 pt-4">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600 transition-colors duration-200 hover:text-electric-500"
                    >
                      View certificate
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-xl text-center">
        <p className="text-base leading-relaxed text-ink-500">
          Each certification sharpens the same instinct: owning the product, thinking like the business, and
          building like an engineer.
        </p>
      </Reveal>
    </SectionWrapper>
  );
}

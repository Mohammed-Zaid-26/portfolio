"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Dna, HeartPulse, LineChart } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import pharma from "@/data/pharma.json";
import { viewportOnce } from "@/lib/motion";

const ICONS = [Dna, HeartPulse, Brain, LineChart, Activity];

export default function PharmaTech() {
  return (
    <SectionWrapper id="pharma-tech">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="kicker text-vital-600">Future Vision</p>
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink-950 sm:text-6xl">
          {pharma.title}
        </h2>
        <p className="mt-6 text-lg font-medium text-ink-800">{pharma.positioning}</p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{pharma.statement}</p>
      </Reveal>

      <div className="relative mx-auto mt-12 grid max-w-5xl gap-y-14 sm:grid-cols-5 sm:gap-x-4">
        <div className="pointer-events-none absolute inset-x-0 top-7 hidden h-px overflow-hidden sm:block">
          <motion.div
            className="h-full bg-ink-950/15"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-vital-500"
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={viewportOnce}
            transition={{ duration: 2.6, delay: 0.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
          />
        </div>

        {pharma.pillars.map((pillar, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={pillar.label} index={i} variant="scale" className="flex flex-col items-center gap-3 text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-vital-500/30 bg-paper-50 text-vital-600 shadow-[0_10px_30px_-12px_rgb(var(--color-vital-500)/0.35)]">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-950">{pillar.label}</p>
                <p className="mt-1.5 max-w-[11rem] text-xs leading-relaxed text-ink-600">{pillar.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-10 max-w-2xl text-center">
        <p className="kicker !text-[10px] text-vital-600">{pharma.researchNote.org}</p>
        <p className="mt-3 text-base leading-relaxed text-ink-600">{pharma.researchNote.detail}</p>
      </Reveal>
    </SectionWrapper>
  );
}

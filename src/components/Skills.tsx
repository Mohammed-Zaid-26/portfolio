"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import skillGroups from "@/data/skills.json";

const COLOR: Record<string, string> = {
  electric: "text-electric-600",
  signal: "text-signal-600",
  vital: "text-vital-600",
};

export default function Skills() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWrapper id="skills" tint>
      <Reveal className="max-w-3xl">
        <p className="kicker">Capability Landscape</p>
        <h2 className="section-heading mt-4">
          A <span className="text-gradient">connected</span> way of thinking, not a checklist.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div className="absolute left-0 top-3 h-[calc(100%-2.5rem)] w-px bg-ink-950/10 sm:left-1" />

        <div className="space-y-2">
          {skillGroups.map((group, i) => {
            const isOpen = open === i;
            const color = COLOR[group.color];
            return (
              <Reveal key={group.category} index={i} variant="left" className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-4 h-2 w-2 rounded-full bg-ink-950/30 sm:left-1" />
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-baseline justify-between gap-4 py-4 text-left">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
                    <span className={`font-display text-3xl font-semibold sm:text-4xl ${isOpen ? color : "text-ink-950"}`}>
                      {group.category}
                    </span>
                  </span>
                  <Plus size={20} className={`shrink-0 text-ink-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-1">
                        <p className="max-w-lg text-sm leading-relaxed text-ink-600">{group.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {group.skills.map((s) => (
                            <span key={s} className="tag">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5">
                          <p className="kicker !text-[10px]">Applied in</p>
                          <p className="mt-2 text-sm text-ink-600">{group.appliedIn.join(" · ")}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i < skillGroups.length - 1 && <div className="rule" />}
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal className="mx-auto mt-20 max-w-3xl text-center" index={1}>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 font-display text-sm font-medium text-ink-400">
          {skillGroups.map((g, i) => (
            <span key={g.category} className="flex items-center gap-3">
              <span className={COLOR[g.color]}>{g.category}</span>
              {i < skillGroups.length - 1 && <span>↓</span>}
            </span>
          ))}
        </p>
      </Reveal>
    </SectionWrapper>
  );
}

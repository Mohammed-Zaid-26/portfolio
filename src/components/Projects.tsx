"use client";

import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import { BookOpen, Lock } from "lucide-react";
import projects from "@/data/projects.json";

/** "SAGINT OS — Tokenized Compliance…" -> "SAGINT OS" for the tab label. */
const shortName = (name: string) => name.split(" — ")[0];

export default function Projects() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern, automatic activation)
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = projects.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <SectionWrapper id="projects" tint>
      <Reveal className="max-w-3xl">
        <p className="kicker">Product Case Studies</p>
        <h2 className="section-heading mt-4">
          Every project, a <span className="text-gradient">story</span> worth telling.
        </h2>
        <p className="mt-4 text-sm text-ink-500">Brief by design — several engagements sit under active NDAs.</p>
      </Reveal>

      <Reveal className="mt-10 grid gap-4 md:grid-cols-[260px_1fr] md:gap-6" index={1}>
        {/* Tab list: vertical on desktop, swipeable chips on mobile */}
        <div
          role="tablist"
          aria-label="Case studies"
          aria-orientation="vertical"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`case-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`case-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors md:w-full ${
                  selected
                    ? "border-ink-950/15 bg-paper-50 shadow-[0_8px_24px_-16px_rgba(20,22,26,0.35)]"
                    : "border-transparent hover:bg-paper-50/60"
                }`}
              >
                <span
                  className={`hidden h-6 w-0.5 shrink-0 rounded-full transition-colors md:block ${
                    selected ? "bg-electric-500" : "bg-transparent"
                  }`}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold ${selected ? "text-ink-950" : "text-ink-600 group-hover:text-ink-950"}`}
                  >
                    {shortName(p.name)}
                  </span>
                  <span className="mt-0.5 hidden truncate text-xs text-ink-400 md:block">{p.category}</span>
                </span>
                {p.confidential && <Lock size={13} className="shrink-0 text-ink-400" aria-label="Confidential" />}
                {p.publication && <BookOpen size={13} className="shrink-0 text-ink-400" aria-label="Published" />}
              </button>
            );
          })}
        </div>

        {/* Desktop: all panels share one grid cell, so the section keeps the height of the tallest one and never jumps.
            Mobile: only the active panel takes space, avoiding a blank gap under short projects. */}
        <div className="grid">
          {projects.map((project, i) => {
            const selected = i === active;
            return (
              <div
                key={project.id}
                role="tabpanel"
                id={`case-panel-${project.id}`}
                aria-labelledby={`case-tab-${project.id}`}
                aria-hidden={!selected}
                className={`col-start-1 row-start-1 flex flex-col rounded-2xl border border-ink-950/10 bg-paper-50 p-7 transition-opacity duration-300 sm:p-8 ${
                  selected ? "opacity-100" : "pointer-events-none opacity-0 max-md:hidden"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="tag">{project.category}</span>
                  {project.confidential && (
                    <span className="flex items-center gap-1 text-xs text-ink-400">
                      <Lock size={12} /> Confidential
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">{project.name}</h3>

                <p className="mt-4 text-base leading-relaxed text-ink-600">{project.summary}</p>

                {project.publication && (
                  <p className="mt-4 flex items-start gap-2 text-xs text-ink-400">
                    <BookOpen size={13} className="mt-px shrink-0" />
                    Published — {project.publication.venue}, {project.publication.detail}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

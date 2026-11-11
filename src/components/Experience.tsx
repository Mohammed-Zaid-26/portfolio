"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import { SHOW_QEDENCE, visibleExperience as experience } from "@/lib/visibility";

type Exp = (typeof experience)[number];

/** Auto-scroll speed of the card row, in px per second. */
const SPEED = 28;

const splitResponsibilities = (exp: Exp) => ({
  approach: exp.responsibilities.slice(0, -1),
  impact: exp.responsibilities[exp.responsibilities.length - 1],
});

function CurrentBadge() {
  return (
    <span className="rounded-full bg-vital-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-vital-600">Current</span>
  );
}

/** Approach, projects, impact and tags. `compact` lists project names only (used inside cards). */
function Details({ exp, compact }: { exp: Exp; compact?: boolean }) {
  const { approach, impact } = splitResponsibilities(exp);
  return (
    <div className={compact ? "space-y-5" : "space-y-6"}>
      <div>
        <p className="kicker">Approach</p>
        <ul className="mt-3 space-y-2.5">
          {approach.map((r) => (
            <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric-500" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {exp.projects.length > 0 &&
        (compact ? (
          <div>
            <p className="kicker">Projects</p>
            <ul className="mt-2.5 space-y-1.5">
              {exp.projects.map((p) => (
                <li key={p.name} className="text-sm font-medium leading-snug text-ink-950">
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {exp.projects.map((p) => (
              <div key={p.name}>
                <p className="text-sm font-semibold text-ink-950">{p.name}</p>
                <ul className="mt-1.5 space-y-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-xs text-ink-600">
                      · {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

      <div>
        <p className="kicker text-vital-600">Impact</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{impact}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {exp.tech.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function RoleCard({
  exp,
  index,
  expanded,
  onToggle,
  duplicate,
  loopStart,
}: {
  exp: Exp;
  index: number;
  expanded: boolean;
  onToggle: (card: HTMLElement) => void;
  duplicate?: boolean;
  /** Marks the first card of the second copy; its offset equals the loop width. */
  loopStart?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const detailsId = `role-details-${duplicate ? "b" : "a"}-${index}`;

  return (
    <article
      ref={ref}
      aria-hidden={duplicate || undefined}
      data-loop-start={loopStart || undefined}
      className={`w-[80vw] max-w-[340px] shrink-0 rounded-2xl border bg-paper-50 p-6 transition-colors sm:w-[340px] ${
        expanded ? "border-ink-950/25" : "border-ink-950/10 hover:border-ink-950/20"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs text-ink-400">0{index + 1}</p>
        {exp.current && <CurrentBadge />}
      </div>
      <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ink-950">{exp.company}</h3>
      <p className="mt-1.5 text-sm font-medium text-electric-600">{exp.role}</p>
      <p className="mt-1 text-xs text-ink-400">
        {exp.period} · {exp.location}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-600">{exp.summary}</p>

      <button
        type="button"
        tabIndex={duplicate ? -1 : undefined}
        onClick={() => ref.current && onToggle(ref.current)}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="btn-text mt-4"
      >
        {expanded ? "Hide details" : "View details"}
        <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={detailsId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-t border-ink-950/10 pt-5">
              <Details exp={exp} compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/**
 * Horizontal row of role cards that drifts slowly and loops (the list is rendered twice
 * so the wrap is seamless). Drifting pauses on hover, focus, touch, while a card is
 * expanded, when off screen, when the visitor presses pause, and never runs for
 * prefers-reduced-motion.
 */
function RoleCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Values read inside the animation loop without restarting it
  const hover = useRef(false);
  const focus = useRef(false);
  const visible = useRef(true);
  const holdUntil = useRef(0);
  const blocked = useRef(false);
  blocked.current = paused || expanded !== null || reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting));
    io.observe(el);

    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    let lastSet = pos;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const active = !blocked.current && !hover.current && !focus.current && visible.current && now > holdUntil.current;

      // Pick up any manual scrolling (swipe, wheel, arrows) before continuing
      if (Math.abs(el.scrollLeft - lastSet) > 2) pos = el.scrollLeft;

      const loopStart = el.querySelector<HTMLElement>("[data-loop-start]");
      if (active && loopStart) {
        const loopWidth = loopStart.offsetLeft - (el.firstElementChild as HTMLElement).offsetLeft;
        pos += (SPEED * dt) / 1000;
        if (loopWidth > 0 && pos >= loopWidth) pos -= loopWidth;
        el.scrollLeft = pos;
      }
      lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const hold = (ms: number) => (holdUntil.current = performance.now() + ms);

  const step = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector("article");
    if (!el || !card) return;
    hold(1500);
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  const toggle = (key: string, card: HTMLElement) => {
    const opening = expanded !== key;
    setExpanded(opening ? key : null);
    if (opening) {
      // Bring the opened card fully into the row's view
      requestAnimationFrame(() => card.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" }));
    }
  };

  const copies = reduceMotion ? ["a"] : ["a", "b"];

  return (
    <div className="mt-10">
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Professional roles"
        onMouseEnter={() => (hover.current = true)}
        onMouseLeave={() => (hover.current = false)}
        onFocus={() => (focus.current = true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) focus.current = false;
        }}
        onPointerDown={() => hold(4000)}
        onWheel={() => hold(2500)}
        className="-mx-6 flex items-start gap-5 overflow-x-auto px-6 pb-2 [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [scroll-behavior:auto] md:[mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {copies.map((copy) =>
          experience.map((exp, i) => {
            const key = `${copy}-${i}`;
            return (
              <RoleCard
                key={key}
                exp={exp}
                index={i}
                duplicate={copy === "b"}
                loopStart={copy === "b" && i === 0}
                expanded={expanded === key}
                onToggle={(el) => toggle(key, el)}
              />
            );
          }),
        )}
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/15 text-ink-700 transition-colors hover:bg-ink-950/[0.04]"
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous role"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/15 text-ink-700 transition-colors hover:bg-ink-950/[0.04]"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next role"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/15 text-ink-700 transition-colors hover:bg-ink-950/[0.04]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/**
 * Every role with all details visible — shown when the header "View details" is on.
 * Rows alternate sides on desktop: odd rows put the role on the right and details on the left.
 */
function FullList() {
  return (
    <div className="mt-12 space-y-12">
      {experience.map((exp, i) => (
        <motion.div
          key={exp.company + exp.period}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-ink-950/10 pt-10 first:border-0 first:pt-0"
        >
          <div className={`grid gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}>
            <div className="md:[direction:ltr]">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-xs text-ink-400">0{i + 1}</p>
                {exp.current && <CurrentBadge />}
              </div>
              <h3 className="mt-3 font-display text-3xl font-medium text-ink-950 sm:text-4xl">{exp.company}</h3>
              <p className="mt-2 text-base font-medium text-electric-600">{exp.role}</p>
              <p className="mt-1 text-sm text-ink-400">
                {exp.period} · {exp.location}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">{exp.summary}</p>
            </div>
            <div className="md:[direction:ltr]">
              <Details exp={exp} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false);

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-3xl">
          <p className="kicker">Professional Journey</p>
          <h2 className="section-heading mt-4">
            From requirements desk to{" "}
            <span className="text-highlight">{SHOW_QEDENCE ? "founder’s seat" : "delivery"}</span>.
          </h2>
        </Reveal>
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink-950/20 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:border-ink-950/40 hover:bg-ink-950/[0.03] md:self-auto"
        >
          {showAll ? "Hide details" : "View details"}
          <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
        </button>
      </div>

      {showAll ? <FullList /> : <RoleCarousel />}
    </SectionWrapper>
  );
}

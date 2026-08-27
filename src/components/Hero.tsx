"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import certifications from "@/data/certifications.json";
import projects from "@/data/projects.json";
import howithink from "@/data/howithink.json";
import MagneticButton from "./MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

const DOMAINS = [
  {
    label: "Enterprise SaaS",
    items: ["Unified Inbox — AI-Augmented", "CodeHub — E-Learning"],
  },
  {
    label: "Blockchain & Compliance",
    items: ["ESCRA — Workflow Platform", "Sagint OS — DFARS Compliance"],
  },
  {
    label: "Healthcare & Research",
    items: ["Taipei ICHIT — Mortality Risk ML", "LifeSaver — Published, IRJMETS"],
  },
];

const DOMAIN_TAGS = ["AI Integration", "Blockchain", "Healthcare Research", "Enterprise SaaS"];

const METRICS = [
  { value: `${experience.length}`, label: "Professional engagements" },
  { value: `${projects.length}`, label: "Products & case studies" },
  { value: `${certifications.length}`, label: "Certifications earned" },
];

const BARS = [38, 62, 50, 78, 65, 90, 72, 84];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const panelRotate = useTransform(scrollYProgress, [0, 1], [0, 2.5]);
  const layerBackY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const layerFrontY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [stepIndex, setStepIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStepIndex((i) => (i + 1) % howithink.length), 1900);
    return () => clearInterval(id);
  }, []);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  function handlePanelMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: relX * 10, y: relY * -10 });
  }
  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper-50 pt-28 pb-16">
      <div className="ambient-wash" />
      <div className="bg-fieldnotes pointer-events-none absolute inset-0 opacity-60" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center md:gap-10 md:px-10">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vital-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vital-500" />
            </span>
            <span>How I work:</span>
            <span className="relative inline-block h-[14px] min-w-[96px] overflow-hidden text-ink-950">
              <AnimatePresence mode="wait">
                <motion.span
                  key={howithink[stepIndex].step}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0"
                >
                  {howithink[stepIndex].step}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} custom={1} className="kicker mt-4">
            {profile.titles.join(" · ")} · {profile.tagline}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={2}
            className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.75rem] xl:text-[4rem]"
          >
            I turn <span className="text-gradient">business ambiguity</span> into systems that{" "}
            <span className="text-vital-600">ship</span>.
          </motion.h1>

          <motion.p variants={fadeUp} custom={3} className="mt-7 max-w-lg text-base leading-relaxed text-ink-600">
            I&apos;m the Business Analyst behind an AI-augmented enterprise inbox and a DFARS-aligned
            blockchain compliance platform at AMT — with a healthcare AI research background, and Qedence,
            a startup I&apos;m co-founding, running alongside it.
          </motion.p>

          <motion.div variants={fadeUp} custom={4} className="mt-5 flex flex-wrap gap-2">
            {DOMAIN_TAGS.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a href="#projects" className="btn-primary">
                View My Work <ArrowRight size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={profile.resumePath} download className="btn-secondary">
                <Download size={16} /> Resume
              </a>
            </MagneticButton>
            <a href="#contact" className="btn-text">
              Let&apos;s collaborate <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={6} className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink-950/10 pt-7">
            {METRICS.map((m) => (
              <div key={m.label}>
                <p className="font-display text-2xl font-semibold text-ink-950">{m.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-400">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: panelY, rotateZ: panelRotate, transformStyle: "preserve-3d", perspective: 1200 }}
          className="relative"
        >
          <motion.div
            style={{ y: layerBackY }}
            className="absolute -right-6 -top-6 hidden h-40 w-40 rounded-2xl border border-signal-500/25 bg-signal-500/[0.06] sm:block"
          />
          <motion.div
            style={{ y: layerFrontY }}
            className="absolute -bottom-8 -left-6 hidden h-28 w-28 rounded-2xl border border-vital-500/25 bg-vital-500/[0.07] sm:block"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8, rotateY: 0 }}
            animate={{ opacity: 1, y: 0, rotateX: tilt.y, rotateY: tilt.x }}
            transition={{
              opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              rotateX: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
              rotateY: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
            }}
            onMouseMove={handlePanelMove}
            onMouseLeave={resetTilt}
            style={{ transformStyle: "preserve-3d" }}
            className="device-panel animate-drift-slow relative p-5"
          >
            <div className="flex items-center gap-1.5 border-b border-ink-950/[0.06] pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-950/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-950/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-950/10" />
              <span className="ml-3 font-mono text-[11px] text-ink-400">active-engagements.log</span>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] text-vital-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vital-500" /> live
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {DOMAINS.map((col, colI) => (
                <div key={col.label}>
                  <p className="kicker !text-[10px] !tracking-[0.16em] text-ink-400">{col.label}</p>
                  <div className="mt-2.5 space-y-2">
                    {col.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + colI * 0.1 + i * 0.08 }}
                        className="rounded-lg border border-ink-950/[0.06] bg-paper-100 px-2.5 py-2.5"
                      >
                        <p className="text-[11px] font-medium leading-snug text-ink-800">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-ink-950/[0.06] pt-4">
              <p className="kicker !text-[10px] !tracking-[0.16em] text-ink-400">Delivery Rhythm</p>
              <div className="mt-3 flex items-end gap-1.5">
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 0.5}px` }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 rounded-t bg-gradient-to-t from-electric-500/50 to-vital-400/60"
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["BRD", "FRD", "RTM", "UAT", "Agile"].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

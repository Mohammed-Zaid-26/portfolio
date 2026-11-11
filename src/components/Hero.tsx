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
import NetworkCanvas from "./NetworkCanvas";
import { fadeUp, staggerContainer } from "@/lib/motion";

const DOMAIN_TAGS = ["AI Integration", "Blockchain", "Healthcare Research", "Enterprise SaaS"];

const METRICS = [
  { value: `${experience.length}`, label: "Professional engagements" },
  { value: `${projects.length}`, label: "Products & case studies" },
  { value: `${certifications.length}`, label: "Certifications earned" },
];

const [FIRST_NAME, ...REST] = profile.name.split(" ");
const LAST_NAME = REST.join(" ");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // Fade the hero out on scroll only on wide screens; on phones the portrait sits
  // below the fold and would already be half-faded by the time it is visible.
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const fade = useTransform(scrollYProgress, [0, 0.8], isWide ? [1, 0] : [1, 1]);

  const [stepIndex, setStepIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStepIndex((i) => (i + 1) % howithink.length), 1900);
    return () => clearInterval(id);
  }, []);

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
            className="mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.75rem] xl:text-[4rem]"
          >
            I turn <span className="text-highlight">business ambiguity</span> into systems that{" "}
            ship.
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
                <p className="font-display text-2xl font-medium text-ink-950">{m.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-400">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: panelY }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate aspect-[4/5] [container-type:inline-size]"
          >
            {/* Faint theme-coloured glow behind the mesh */}
            <div className="pointer-events-none absolute -inset-[10%] bg-[radial-gradient(closest-side_at_50%_46%,rgb(var(--hero-net)/0.10),transparent_100%)] dark:bg-[radial-gradient(closest-side_at_50%_46%,rgb(var(--hero-net)/0.2),transparent_100%)]" />

            {/* Dense node mesh, softly blurred, dissolving into the page at its edges */}
            <NetworkCanvas className="absolute -inset-[8%] h-[116%] w-[116%] blur-[1.2px] [mask-image:radial-gradient(closest-side_at_50%_46%,black_62%,transparent_100%)]" />

            {/* Portrait: smaller and dimmed so it sits behind the name, faded on all edges */}
            <div className="absolute left-[10%] top-[5%] w-[80%] [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
              <motion.img
                src="/images/portrait.webp"
                alt={`Portrait of ${profile.name}`}
                width={1000}
                height={1000}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full select-none [mask-image:linear-gradient(to_bottom,black_45%,transparent_92%)] opacity-90 saturate-[0.6] dark:opacity-100 dark:brightness-[0.62] dark:saturate-[0.5]"
                draggable={false}
              />
            </div>

            <div className="absolute inset-x-0 top-[40%] flex flex-col items-center text-center [text-shadow:0_0_2cqw_rgb(var(--color-paper-50)),0_0_7cqw_rgb(var(--color-paper-50))]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="font-mono text-[2.3cqw] uppercase tracking-[0.3em] text-ink-700"
              >
                {profile.titles[0]} &amp; Product Builder
              </motion.p>
              <h2
                aria-label={profile.name}
                style={{ fontFamily: "var(--font-display), serif" }}
                className="mt-[2cqw] uppercase leading-[0.9] tracking-[-0.01em]"
              >
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[17.5cqw] text-ink-950"
                >
                  {FIRST_NAME}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative inline-block text-[17.5cqw]"
                >
                  <span className="text-ink-950/55">{LAST_NAME}</span>
                  <span className="absolute -right-[4cqw] bottom-[4.5cqw] h-[3cqw] w-[3cqw] rounded-full bg-vital-500 shadow-[0_0_18px_rgb(var(--color-vital-500)/0.7)]" />
                </motion.span>
              </h2>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

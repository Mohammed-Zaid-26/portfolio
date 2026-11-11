"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import howithink from "@/data/howithink.json";

/** Time each step stays highlighted (matches the hero's "How I work" ticker). */
const STEP_MS = 1900;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Understand → Analyze → … → Improve" row.
 * Steps enter one after another when scrolled into view, then a highlight
 * (gradient text + gliding underline + nudging arrow) loops through them
 * while the row is on screen. Static for prefers-reduced-motion.
 */
export default function ThinkingLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, margin: "-80px" });
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const last = howithink.length - 1;

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % howithink.length), STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-4">
      {howithink.map((step, i) => {
        const isActive = !reduce && entered && i === active;
        return (
          <motion.span
            key={step.step}
            // Same initial state on server and client; reduced motion just makes the entrance instant
            initial={{ opacity: 0, y: 14 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={reduce ? { duration: 0 } : { duration: 0.5, delay: i * 0.12, ease: EASE }}
            className="flex items-baseline gap-3"
          >
            <span className="relative font-display text-2xl font-medium sm:text-3xl">
              {/* Plain word, crossfaded with a gradient copy when active */}
              <span className={`text-ink-950 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                {step.step}
              </span>
              <span
                aria-hidden="true"
                className={`text-highlight absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {step.step}
              </span>
              {isActive && (
                <motion.span
                  layoutId="thinking-loop-underline"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-electric-500 to-vital-500"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                />
              )}
            </span>
            {i < last && (
              <motion.span
                aria-hidden="true"
                animate={isActive ? { x: [0, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className={`text-xl transition-colors duration-500 ${isActive ? "text-electric-500" : "text-ink-400"}`}
              >
                →
              </motion.span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

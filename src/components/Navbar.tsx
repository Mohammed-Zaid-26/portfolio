"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";
import { SHOW_QEDENCE } from "@/lib/visibility";

const ALL_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Capability" },
  { href: "#experience", label: "Journey" },
  { href: "#projects", label: "Work" },
  { href: "#certifications", label: "Learning" },
  { href: "#qedence", label: "Qedence" },
  { href: "#pharma-tech", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

const LINKS = SHOW_QEDENCE ? ALL_LINKS : ALL_LINKS.filter((l) => l.href !== "#qedence");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scroll-spy: the active section is the one whose top most recently passed a line 35% down the viewport
      // (by position, so it works whatever order the links are in). At the very bottom of the page the last
      // section on the page wins, even if it is too short to reach that line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const line = atBottom ? Infinity : window.innerHeight * 0.35;
      let current: string | null = null;
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-ink-950/[0.06] bg-paper-50/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#hero" className="font-display text-base font-medium tracking-tight text-ink-950">
          Mohammed Zaid
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`group relative text-[13px] font-medium transition-colors hover:text-ink-950 ${
                  isActive ? "text-ink-950" : "text-ink-600"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink-950 transition-all duration-300 group-hover:w-full" />
                {isActive && (
                  // Slides from link to link as the reader scrolls
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-electric-600 dark:bg-electric-400"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <MagneticButton strength={0.25}>
            <a href="#contact" className="btn-primary !px-5 !py-2.5 text-[13px]">
              Let&apos;s Talk
            </a>
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-950"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ink-950/[0.06] bg-paper-50 px-6 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-0.5">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.href.slice(1) ? "location" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-medium hover:bg-ink-950/[0.03] ${
                    active === link.href.slice(1)
                      ? "bg-electric-500/10 text-electric-700 dark:text-electric-300"
                      : "text-ink-800"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

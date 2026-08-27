"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Journey" },
  { href: "#skills", label: "Capability" },
  { href: "#projects", label: "Work" },
  { href: "#certifications", label: "Learning" },
  { href: "#qedence", label: "Qedence" },
  { href: "#pharma-tech", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-ink-950/[0.06] bg-paper-50/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#hero" className="font-display text-base font-semibold tracking-tight text-ink-950">
          Mohammed Zaid
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-950"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink-950 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
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
                  className="rounded-lg px-3 py-3 text-sm font-medium text-ink-800 hover:bg-ink-950/[0.03]"
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

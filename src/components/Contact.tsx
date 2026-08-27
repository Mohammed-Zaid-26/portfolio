"use client";

import { Download, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import profile from "@/data/profile.json";

export default function Contact() {
  return (
    <footer id="contact" className="relative w-full scroll-mt-24 bg-paper-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-16 md:px-10">
        <div className="grid gap-16 sm:divide-x sm:divide-ink-950/10 lg:grid-cols-2">
          <Reveal variant="left">
            <p className="kicker">Get in touch</p>
            <h2 className="section-heading mt-4">
              Have an idea <span className="text-gradient">worth building?</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
              I am always interested in discussions around innovative products, healthcare technology, startups and
              digital transformation. Reach out directly — I read every message.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Linkedin size={16} /> Connect on LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={`mailto:${profile.email}`} className="btn-secondary">
                  <Mail size={16} /> {profile.email}
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal variant="right" index={1} className="sm:pl-16">
            <p className="kicker">Resume</p>
            <h2 className="section-heading mt-4">
              Take the <span className="text-gradient">full picture</span> with you.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
              Every role, project and certification on this page, in one PDF.
            </p>
            <MagneticButton className="mt-8">
              <a href={profile.resumePath} download className="btn-primary">
                <Download size={16} /> Download Resume
              </a>
            </MagneticButton>
          </Reveal>
        </div>

        <p className="mt-10 text-center font-display text-sm text-ink-400">
          © {new Date().getFullYear()} {profile.name}. Built with intent.
        </p>
      </div>
    </footer>
  );
}

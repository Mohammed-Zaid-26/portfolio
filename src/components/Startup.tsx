"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import startup from "@/data/startup.json";

export default function Startup() {
  return (
    <SectionWrapper id="qedence">
      <Reveal className="max-w-3xl">
        <p className="kicker">Building Beyond Roles</p>
        <h2 className="section-heading mt-4">
          Introducing <span className="text-gradient">{startup.name}</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-600">{startup.pitch}</p>
        <p className="mt-2 text-sm text-ink-400">
          {startup.role} · Since {startup.since}
        </p>
      </Reveal>

      <div className="mt-24 space-y-16">
        {startup.pillars.map((pillar, i) => (
          <Reveal key={pillar.stage} index={i} variant={i % 2 === 0 ? "left" : "right"} className="border-t border-ink-950/10 pt-16 first:border-0 first:pt-0">
            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12">
              <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
                <span className="font-mono text-sm text-ink-400">0{i + 1}</span>
                <span className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">{pillar.stage}</span>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-electric-600">{pillar.title}</p>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-600">{pillar.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ink-950/10 pt-10 sm:flex-row sm:items-center">
        <p className="max-w-md text-base text-ink-600">
          Not just looking for a role — open to startup collaborations, product ideas, business opportunities and
          strategic partnerships.
        </p>
        <MagneticButton className="shrink-0">
          <a href="#contact" className="btn-primary">
            Talk Qedence with me
          </a>
        </MagneticButton>
      </Reveal>
    </SectionWrapper>
  );
}

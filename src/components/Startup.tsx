"use client";

import { ArrowRight, Briefcase, Handshake, Lightbulb, Rocket, Search, Send, type LucideIcon } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import startup from "@/data/startup.json";

type Pillar = (typeof startup.pillars)[number];

type Node = {
  stage: Pillar["stage"];
  number: string;
  accent: string;
  ring: string;
  icon: LucideIcon;
};

const NODES: Node[] = [
  { stage: "Origin", number: "01", accent: "text-electric-600", ring: "bg-electric-500/10", icon: Lightbulb },
  { stage: "Challenge", number: "02", accent: "text-vital-600", ring: "bg-vital-500/10", icon: Search },
  { stage: "Possibility", number: "03", accent: "text-signal-600", ring: "bg-signal-500/10", icon: Handshake },
  { stage: "Direction", number: "04", accent: "text-electric-600", ring: "bg-electric-500/10", icon: Rocket },
];

function pillar(stage: Pillar["stage"]) {
  return startup.pillars.find((p) => p.stage === stage)!;
}

export default function Startup() {
  return (
    <SectionWrapper id="qedence" tint>
      <div className="ambient-wash" />

      <div className="relative">
        <Reveal className="max-w-xl">
          <p className="kicker">Building Beyond Roles</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl">
            Introducing
            <br />
            <span className="text-gradient">{startup.name}</span>
          </h2>
          <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-electric-500 to-vital-500" />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-600">{startup.pitch}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-ink-400">
            <Briefcase size={14} />
            {startup.role} | Since {startup.since}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NODES.map((n, i) => {
            const Icon = n.icon;
            const p = pillar(n.stage);
            return (
              <Reveal key={n.stage} index={i} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper-50 p-6 transition-colors hover:border-ink-950/20">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${n.ring} ${n.accent}`}>
                      <Icon size={18} />
                    </span>
                    <span className={`font-mono text-xs font-bold tracking-wider ${n.accent}`}>{n.number}</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-bold text-ink-950">{n.stage}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal className="relative mt-10 overflow-hidden rounded-3xl border border-ink-950/10 bg-paper-50 p-8 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-ink-950/10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-electric-500/10 text-electric-600">
              <Rocket size={20} />
            </span>
            <p className="text-base leading-relaxed text-ink-700">
              Not just looking for a role. Open to startup <span className="font-semibold text-electric-600">collaborations</span>,{" "}
              <span className="font-semibold text-vital-600">product ideas</span>, business{" "}
              <span className="font-semibold text-signal-600">opportunities</span> and strategic{" "}
              <span className="font-semibold text-electric-600">partnerships</span>.
            </p>
          </div>
          <div className="relative flex items-start gap-4 sm:pl-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-vital-500 text-paper-50">
              <Send size={18} />
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink-950">Let&apos;s Build Something Meaningful</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{"I'm always excited to discuss ideas that create real impact."}</p>
              <MagneticButton className="mt-4 inline-block">
                <a href="#contact" className="btn-primary">
                  Talk Qedence with me
                  <ArrowRight size={15} />
                </a>
              </MagneticButton>
            </div>
            <div className="bg-fieldnotes pointer-events-none absolute -right-2 top-0 hidden h-16 w-16 opacity-40 sm:block" />
          </div>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

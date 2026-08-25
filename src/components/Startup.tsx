"use client";

import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Handshake,
  Lightbulb,
  Rocket,
  Search,
  Send,
  type LucideIcon,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import startup from "@/data/startup.json";

type Pillar = (typeof startup.pillars)[number];

type Node = {
  stage: Pillar["stage"];
  number: string;
  cx: number;
  cy: number;
  hex: string;
  accent: string;
  icon: LucideIcon;
  connector: { x: number; y: number; icon: LucideIcon };
};

const VIEW = 700;
const HUB = { cx: 350, cy: 350, r: 118 };
const RING_R = 196;
const NODE_R = 100;

const NODES: Node[] = [
  {
    stage: "Origin",
    number: "01",
    cx: 350,
    cy: 104,
    hex: "#3163dd",
    accent: "text-electric-600",
    icon: Lightbulb,
    connector: { x: 350, y: 218, icon: ChevronUp },
  },
  {
    stage: "Challenge",
    number: "02",
    cx: 104,
    cy: 350,
    hex: "#0f9d64",
    accent: "text-vital-600",
    icon: Search,
    connector: { x: 218, y: 350, icon: ChevronLeft },
  },
  {
    stage: "Possibility",
    number: "03",
    cx: 596,
    cy: 350,
    hex: "#7c56d6",
    accent: "text-signal-600",
    icon: Handshake,
    connector: { x: 482, y: 350, icon: ChevronRight },
  },
  {
    stage: "Direction",
    number: "04",
    cx: 350,
    cy: 596,
    hex: "#3163dd",
    accent: "text-electric-600",
    icon: Rocket,
    connector: { x: 350, y: 482, icon: ChevronDown },
  },
];

function pct(x: number, y: number) {
  return { left: `${(x / VIEW) * 100}%`, top: `${(y / VIEW) * 100}%` };
}

function pillar(stage: Pillar["stage"]) {
  return startup.pillars.find((p) => p.stage === stage)!;
}

export default function Startup() {
  return (
    <SectionWrapper id="qedence">
      <div className="ambient-wash" />

      <div className="relative grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10">
        <Reveal>
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

        <div>
          {/* Desktop: orbit diagram */}
          <Reveal variant="scale" className="relative mx-auto hidden w-full max-w-[560px] lg:block">
            <div className="relative w-full" style={{ aspectRatio: `${VIEW} / ${VIEW}` }}>
              <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="qedence-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1c3a7a" />
                    <stop offset="55%" stopColor="#3163dd" />
                    <stop offset="100%" stopColor="#0f9d64" />
                  </linearGradient>
                </defs>

                {NODES.map((n) => (
                  <line key={n.stage} x1={HUB.cx} y1={HUB.cy} x2={n.cx} y2={n.cy} stroke="rgba(20,22,26,0.12)" strokeWidth={1} strokeDasharray="3 7" />
                ))}

                <circle cx={HUB.cx} cy={HUB.cy} r={RING_R} fill="none" stroke="url(#qedence-ring)" strokeOpacity={0.4} strokeWidth={2.5} />

                {NODES.map((n) => (
                  <circle key={n.stage} cx={n.cx} cy={n.cy} r={NODE_R} fill="#fdfcfa" stroke={n.hex} strokeOpacity={0.5} strokeWidth={2} />
                ))}

                <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="#fdfcfa" stroke="url(#qedence-ring)" strokeWidth={3} />
              </svg>

              {NODES.map((n) => (
                <span
                  key={`${n.stage}-num`}
                  className={`absolute -translate-x-1/2 -translate-y-full pb-2 font-mono text-xs font-bold tracking-wider ${n.accent}`}
                  style={pct(n.cx, n.cy - NODE_R)}
                >
                  {n.number}
                </span>
              ))}

              {NODES.map((n) => {
                const Icon = n.icon;
                const p = pillar(n.stage);
                return (
                  <div
                    key={n.stage}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 px-6 text-center"
                    style={{ ...pct(n.cx, n.cy), width: `${((NODE_R * 1.7) / VIEW) * 100}%` }}
                  >
                    <Icon size={22} className={n.accent} />
                    <span className="font-display text-base font-bold text-ink-950">{n.stage}</span>
                    <span className="text-xs leading-snug text-ink-500">{p.description}</span>
                  </div>
                );
              })}

              <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center" style={pct(HUB.cx, HUB.cy)}>
                <span className="text-gradient font-display text-4xl font-bold">Q</span>
                <span className="font-display text-lg font-bold tracking-wide text-ink-950">{startup.name.toUpperCase()}</span>
                <span className="mt-1 max-w-[9rem] text-xs leading-snug text-ink-500">{startup.tagline}</span>
                <span className="mt-2 flex items-center gap-1.5">
                  <span className="h-px w-5 bg-electric-500" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />
                  <span className="h-px w-5 bg-vital-500" />
                </span>
              </div>

              {NODES.map((n) => {
                const Chevron = n.connector.icon;
                return (
                  <span
                    key={`${n.stage}-chevron`}
                    className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-950/10 bg-paper-50 shadow-[0_6px_16px_-8px_rgba(20,22,26,0.4)] ${n.accent}`}
                    style={pct(n.connector.x, n.connector.y)}
                  >
                    <Chevron size={14} />
                  </span>
                );
              })}
            </div>
          </Reveal>

          {/* Mobile / tablet: stacked cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const p = pillar(n.stage);
              return (
                <Reveal key={n.stage} index={i} className="flex items-start gap-4 rounded-2xl border border-ink-950/10 bg-paper-50 p-5">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-950/10 ${n.accent}`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className={`font-mono text-[11px] font-bold ${n.accent}`}>{n.number}</p>
                    <p className="mt-0.5 font-display text-base font-bold text-ink-950">{n.stage}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      <Reveal className="relative mt-20 overflow-hidden rounded-3xl border border-ink-950/10 bg-paper-50 p-8 sm:p-10">
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

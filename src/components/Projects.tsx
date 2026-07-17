"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import { Lock } from "lucide-react";
import projects from "@/data/projects.json";

const STAGES: { key: "problem" | "research" | "solution" | "impact"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "research", label: "My Approach" },
  { key: "solution", label: "Solution" },
  { key: "impact", label: "Impact" },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <Reveal className="max-w-3xl">
        <p className="kicker">Product Case Studies</p>
        <h2 className="section-heading mt-4">
          Every project, a <span className="text-gradient">story</span> worth telling.
        </h2>
      </Reveal>

      <div className="mt-24 space-y-28">
        {projects.map((project, i) => (
          <div key={project.id} className="border-t border-ink-950/10 pt-20 first:border-0 first:pt-0">
            <Reveal variant="blur">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag">{project.category}</span>
                {project.confidential && (
                  <span className="flex items-center gap-1 text-xs text-ink-400">
                    <Lock size={12} /> Confidential engagement
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">{project.name}</h3>
            </Reveal>

            <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
              {STAGES.map((stage, si) => (
                <Reveal key={stage.key} index={si} variant={si % 2 === 0 ? "left" : "right"} className="max-w-md">
                  <p className={`kicker ${stage.key === "impact" ? "text-vital-600" : ""}`}>{stage.label}</p>
                  <p className="mt-3 text-lg leading-relaxed text-ink-800">{project[stage.key]}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 max-w-2xl border-t border-ink-950/10 pt-8">
              <p className="kicker text-signal-600">My Contribution</p>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{project.contribution}</p>
            </Reveal>

            {project.publication && (
              <Reveal className="mt-8 max-w-2xl">
                <p className="kicker">Published Research</p>
                <p className="mt-2 text-sm text-ink-800">{project.publication.title}</p>
                <p className="mt-1 text-xs text-ink-400">
                  {project.publication.venue} · {project.publication.detail}
                </p>
              </Reveal>
            )}

            <Reveal className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

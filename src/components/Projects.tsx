"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import { Lock } from "lucide-react";
import projects from "@/data/projects.json";

export default function Projects() {
  return (
    <SectionWrapper id="projects" tint>
      <Reveal className="max-w-3xl">
        <p className="kicker">Product Case Studies</p>
        <h2 className="section-heading mt-4">
          Every project, a <span className="text-gradient">story</span> worth telling.
        </h2>
        <p className="mt-4 text-sm text-ink-500">
          Brief by design — several engagements sit under active NDAs.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} index={i} variant="blur">
            <div className="flex h-full flex-col rounded-2xl border border-ink-950/10 bg-paper-50 p-7 transition-colors hover:border-ink-950/20">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag">{project.category}</span>
                {project.confidential && (
                  <span className="flex items-center gap-1 text-xs text-ink-400">
                    <Lock size={12} /> Confidential
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold text-ink-950">{project.name}</h3>

              <p className="mt-3 text-sm leading-relaxed text-ink-600">{project.summary}</p>

              {project.publication && (
                <p className="mt-3 text-xs text-ink-400">
                  Published — {project.publication.venue}, {project.publication.detail}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}

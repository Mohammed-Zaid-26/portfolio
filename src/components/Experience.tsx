"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import experience from "@/data/experience.json";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <Reveal className="max-w-3xl">
        <p className="kicker">Professional Journey</p>
        <h2 className="section-heading mt-4">
          From requirements desk to <span className="text-gradient">founder&apos;s seat</span>.
        </h2>
      </Reveal>

      <div className="mt-24 space-y-24">
        {experience.map((exp, i) => {
          const approach = exp.responsibilities.slice(0, -1);
          const impact = exp.responsibilities[exp.responsibilities.length - 1];
          const isEven = i % 2 === 0;

          return (
            <div key={exp.company + exp.period} className="border-t border-ink-950/10 pt-16 first:border-0 first:pt-0">
              <div className={`grid gap-10 md:grid-cols-2 md:gap-16 ${isEven ? "" : "md:[direction:rtl]"}`}>
                <Reveal variant={isEven ? "left" : "right"} className="md:[direction:ltr]">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs text-ink-400">0{i + 1}</p>
                    {exp.current && <span className="rounded-full bg-vital-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-vital-600">Current</span>}
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">{exp.company}</h3>
                  <p className="mt-2 text-base font-medium text-electric-600">{exp.role}</p>
                  <p className="mt-1 text-sm text-ink-400">
                    {exp.period} · {exp.location}
                  </p>
                  <p className="mt-6 text-lg leading-relaxed text-ink-600">{exp.summary}</p>
                </Reveal>

                <Reveal variant={isEven ? "right" : "left"} index={1} className="md:[direction:ltr]">
                  <div className="space-y-6">
                    <div>
                      <p className="kicker">Approach</p>
                      <ul className="mt-3 space-y-2.5">
                        {approach.map((r) => (
                          <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric-500" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exp.projects.length > 0 && (
                      <div className="space-y-4">
                        {exp.projects.map((p) => (
                          <div key={p.name}>
                            <p className="text-sm font-semibold text-ink-950">{p.name}</p>
                            <ul className="mt-1.5 space-y-1">
                              {p.points.map((pt) => (
                                <li key={pt} className="text-xs text-ink-600">
                                  · {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="kicker text-vital-600">Impact</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{impact}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

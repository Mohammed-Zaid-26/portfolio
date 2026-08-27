"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import profile from "@/data/profile.json";
import education from "@/data/education.json";
import howithink from "@/data/howithink.json";

const BUILD_ITEMS = [
  {
    title: "Business Solutions",
    detail: "Requirements, workflows and stakeholder alignment that turn ambiguous asks into buildable specs — BRDs, FRDs, RTMs, user stories.",
  },
  {
    title: "Digital Products",
    detail: "Roadmaps, MVPs and feature specs for enterprise SaaS platforms, shaped through direct client and engineering coordination.",
  },
  {
    title: "Healthcare Innovation",
    detail: "Research on ML-driven mortality risk prediction using hospice datasets, and a standing interest in where healthcare meets data and AI.",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <Reveal className="max-w-3xl">
        <p className="kicker">About</p>
        <h2 className="section-heading mt-4">
          I turn ambiguity into <span className="text-gradient">structured, buildable</span> ideas.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-600">{profile.summary}</p>
      </Reveal>

      <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-20">
        <Reveal variant="left">
          <p className="kicker">Who I Am</p>
          <p className="mt-4 text-2xl font-display font-medium leading-snug text-ink-950">
            A Computer Engineering graduate who found his footing at the intersection of business analysis, product
            thinking and healthcare research.
          </p>
          <div className="mt-8 space-y-5">
            {education.map((edu) => (
              <div key={edu.institution} className="border-t border-ink-950/10 pt-5 first:border-0 first:pt-0">
                <p className="text-sm font-semibold text-ink-950">{edu.institution}</p>
                <p className="mt-1 text-sm text-ink-600">
                  {edu.degree} · {edu.period}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="right">
          <p className="kicker">What I Build</p>
          <div className="mt-4 space-y-8">
            {BUILD_ITEMS.map((item) => (
              <div key={item.title}>
                <p className="text-2xl font-display font-medium text-ink-950">{item.title}</p>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <p className="kicker">How I Think</p>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-4">
          {howithink.map((step, i) => (
            <span key={step.step} className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">{step.step}</span>
              {i < howithink.length - 1 && <span className="text-xl text-ink-400">→</span>}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600">
          The loop behind every engagement, from first conversation to shipped outcome — {howithink[0].detail.toLowerCase()}
        </p>
      </Reveal>
    </SectionWrapper>
  );
}

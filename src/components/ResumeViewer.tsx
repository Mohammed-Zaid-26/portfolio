"use client";

import { Download } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import profile from "@/data/profile.json";

export default function ResumeViewer() {
  return (
    <SectionWrapper id="resume">
      <Reveal className="max-w-2xl">
        <p className="kicker">Resume</p>
        <h2 className="section-heading mt-4">
          Take the <span className="text-gradient">full picture</span> with you.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-600">
          Every role, project and certification on this page, in one PDF.
        </p>
        <MagneticButton className="mt-8">
          <a href={profile.resumePath} download className="btn-primary">
            <Download size={16} /> Download Resume
          </a>
        </MagneticButton>
      </Reveal>
    </SectionWrapper>
  );
}

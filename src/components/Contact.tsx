"use client";

import { FormEvent, useState } from "react";
import { Linkedin, Loader2, Mail, Send } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

const INTERESTS = [
  "Collaboration",
  "Startup Idea",
  "Product Discussion",
  "Healthcare Tech Innovation",
  "Business Opportunity",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-lg border border-ink-950/15 bg-paper-50 px-4 py-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors focus:border-electric-500";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      trackEvent("contact_form_submit", { interest: String(data.interest ?? "") });
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or email directly.");
    }
  }

  return (
    <SectionWrapper id="contact" tint>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal variant="left">
          <p className="kicker">Get in touch</p>
          <h2 className="section-heading mt-4">
            Have an idea <span className="text-gradient">worth building?</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
            I am always interested in discussions around innovative products, healthcare technology, startups and
            digital transformation.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2.5 rounded-full border border-ink-950/10 px-4 py-2.5 text-sm font-medium text-ink-800 hover:border-ink-950/25"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex w-fit items-center gap-2.5 rounded-full border border-ink-950/10 px-4 py-2.5 text-sm font-medium text-ink-800 hover:border-ink-950/25"
            >
              <Mail size={16} /> {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal variant="right" index={1} className="device-panel p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="kicker !text-[10px]">Name *</label>
                <input required name="name" type="text" placeholder="Your name" className={fieldClass} />
              </div>
              <div>
                <label className="kicker !text-[10px]">Email *</label>
                <input required name="email" type="email" placeholder="you@company.com" className={fieldClass} />
              </div>
              <div>
                <label className="kicker !text-[10px]">Company / Organization</label>
                <input name="company" type="text" placeholder="Optional" className={fieldClass} />
              </div>
              <div>
                <label className="kicker !text-[10px]">LinkedIn Profile</label>
                <input name="linkedin" type="text" placeholder="Optional" className={fieldClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="kicker !text-[10px]">Area of Interest *</label>
                <select required name="interest" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select an area
                  </option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="kicker !text-[10px]">Message *</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about your idea..."
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>

            <MagneticButton block className="mt-6">
              <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </MagneticButton>

            {status === "success" && (
              <p className="mt-4 text-center text-sm text-vital-600">
                Message sent — thanks for reaching out. I&apos;ll get back to you by email soon.
              </p>
            )}
            {status === "error" && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
          </form>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

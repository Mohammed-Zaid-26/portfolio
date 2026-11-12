"use client";

import { FormEvent, useRef, useState } from "react";
import { Download, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";
import { SHOW_QEDENCE } from "@/lib/visibility";

// Digits only with country code, e.g. "916364444851"
const phoneDigits = profile.phone.replace(/\D/g, "");
const whatsappBase = `https://wa.me/${phoneDigits}`;

const fieldClass =
  "mt-2 w-full rounded-lg border border-ink-950/15 bg-paper-50 px-4 py-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors focus:border-electric-500";

const linkClass =
  "flex w-fit items-center gap-2.5 rounded-full border border-ink-950/10 px-4 py-2.5 text-sm font-medium text-ink-800 hover:border-ink-950/25";

type Fallback = { waUrl: string; mailUrl: string } | null;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fallback, setFallback] = useState<Fallback>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (id: string) => form.elements.namedItem(id) as HTMLInputElement;
    const name = get("full-name");
    const phone = get("phone");
    const email = get("email");
    const msg = form.elements.namedItem("message") as HTMLTextAreaElement;

    // 1. Validate
    name.setCustomValidity(name.value.trim() ? "" : "Please enter your name.");
    msg.setCustomValidity(msg.value.trim() ? "" : "Please write a message.");
    if (!phone.value.trim() && !email.value.trim())
      phone.setCustomValidity("Please provide a phone number or an email address.");
    else if (phone.value.trim() && phone.value.replace(/\D/g, "").length < 7)
      phone.setCustomValidity("Please enter at least 7 digits.");
    else phone.setCustomValidity("");
    email.setCustomValidity("");
    if (email.value.trim() && !email.checkValidity()) email.setCustomValidity("Please enter a valid email.");
    if (!form.reportValidity()) return;

    // 2. Build message (skip empty fields)
    const field = (label: string, input: HTMLInputElement) =>
      input.value.trim() ? [`${label}: ${input.value.trim()}`] : [];
    const body = [
      "New enquiry from the portfolio",
      "",
      ...field("Name", name),
      ...field("Phone", phone),
      ...field("Email", email),
      "",
      msg.value.trim(),
    ].join("\n");

    // 3. Build links
    const waUrl = `${whatsappBase}?text=${encodeURIComponent(body)}`;
    const mailUrl =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(`Enquiry from ${name.value.trim()}`)}` +
      `&body=${encodeURIComponent(body)}`;

    // 4. Open WhatsApp (directly in the user gesture)
    window.open(waUrl, "_blank", "noopener");
    trackEvent("contact_form_submit", { channel: "whatsapp" });

    // 5. Always show fallback (pop-up block is undetectable with noopener)
    setFallback({ waUrl, mailUrl });
  }

  function handleInput(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    target.setCustomValidity?.("");
    (formRef.current?.elements.namedItem("phone") as HTMLInputElement | null)?.setCustomValidity("");
    setFallback(null);
  }

  /** Clears the form after sending. Kept manual so a blocked or abandoned WhatsApp send never loses the message. */
  function startNewMessage() {
    formRef.current?.reset();
    setFallback(null);
    (formRef.current?.elements.namedItem("full-name") as HTMLInputElement | null)?.focus();
  }

  return (
    <footer id="contact" className="relative w-full scroll-mt-24 bg-paper-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal variant="left">
            <p className="kicker">Get in touch</p>
            <h2 className="section-heading mt-4">
              Have an idea <span className="text-highlight">worth building?</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
              I am always interested in discussions around innovative products, healthcare technology,{" "}
              {SHOW_QEDENCE ? "startups and " : "and "}digital transformation. Reach out directly. I read every message.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                <Mail size={16} /> {profile.email}
              </a>
              <a href={`tel:+${phoneDigits}`} className={linkClass}>
                <Phone size={16} /> {profile.phone}
              </a>
            </div>

            <div className="mt-10 border-t border-ink-950/10 pt-8">
              <p className="kicker">Resume</p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600">
                Every role, project and certification on this page, in one PDF.
              </p>
              <MagneticButton className="mt-5">
                <a href={profile.resumePath} download className="btn-secondary">
                  <Download size={16} /> Download Resume
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal variant="right" index={1} className="device-panel p-6 sm:p-8">
            <form
              ref={formRef}
              id="enquiry-form"
              noValidate
              onSubmit={handleSubmit}
              onInput={handleInput}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="full-name" className="kicker !text-[10px]">
                    Name *
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="kicker !text-[10px]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="kicker !text-[10px]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={24}
                    autoComplete="tel"
                    placeholder="+91 ..."
                    className={fieldClass}
                  />
                </div>
                <p className="-mt-2 text-xs text-ink-400 sm:col-span-2">Email or phone, at least one.</p>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="kicker !text-[10px]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={5}
                    placeholder="Tell me about your idea..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </div>

              <MagneticButton block className="mt-6">
                <button type="submit" className="btn-primary w-full">
                  <MessageCircle size={16} /> Continue on WhatsApp
                </button>
              </MagneticButton>
              <p className="mt-3 text-center text-xs text-ink-400">
                Your message opens in WhatsApp, ready for you to send. Nothing is stored on this site.
              </p>

              <div role="status" aria-live="polite" hidden={!fallback} className="mt-4 text-center text-sm text-ink-600">
                {fallback && (
                  <span>
                    Almost done: press send in WhatsApp. Not open?{" "}
                    <a href={fallback.waUrl} target="_blank" rel="noopener noreferrer" className="underline">
                      Try again
                    </a>{" "}
                    or{" "}
                    <a href={fallback.mailUrl} className="underline">
                      send by email
                    </a>
                    .
                    <button
                      type="button"
                      onClick={startNewMessage}
                      className="mt-2 block w-full text-center font-semibold text-electric-600 underline-offset-4 hover:underline dark:text-electric-400"
                    >
                      Start a new message
                    </button>
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        <p className="mt-10 text-center font-display text-sm text-ink-400">
          © {new Date().getFullYear()} {profile.name}. Built with intent.
        </p>
      </div>
    </footer>
  );
}

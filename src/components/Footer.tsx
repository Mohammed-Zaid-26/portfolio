import { Linkedin, Mail } from "lucide-react";
import profile from "@/data/profile.json";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-950/10 bg-paper-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-display text-sm text-ink-400">
          © {new Date().getFullYear()} {profile.name}. Built with intent.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-600 transition-colors hover:border-ink-950/25 hover:text-ink-950"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-600 transition-colors hover:border-ink-950/25 hover:text-ink-950"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

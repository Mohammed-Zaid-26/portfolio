# Mohammed Zaid — Portfolio

Personal portfolio built with Next.js 14 (App Router), Tailwind CSS and Framer Motion.
Fully static: no database, no backend, no API routes. The contact form hands the
visitor's message to WhatsApp (with an email fallback), so there is nothing to host
or configure beyond the site itself.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Framer Motion** for section/scroll animations and micro-interactions
- **HTML canvas** for the hero's animated node-mesh background (no 3D library)
- **Fonts:** Source Serif 4 (headings) + Source Sans 3 (body), via `next/font`
- **lucide-react** for icons
- All content lives in `src/data/*.json` — nothing about you is hardcoded in components

## Project structure

```
src/
  app/
    layout.tsx        — fonts, metadata, JSON-LD, analytics
    page.tsx           — assembles all sections
    sitemap.ts
    globals.css        — theme colours (CSS variables) for light and dark mode
  components/           — one component per section
  data/                 — JSON content (edit these, not the components)
  lib/                  — motion variants, analytics helper
public/
  resume/Mohammed_Zaid_Resume.pdf
```

## Updating content

Everything shown on the site is sourced from `src/data/`:

| File | Powers |
|---|---|
| `profile.json` | Name, titles, tagline, positioning statement, contact links, resume path |
| `education.json` | About section education cards |
| `experience.json` | Career timeline (expandable cards) |
| `projects.json` | Project case-study cards (Problem → Research → Solution → Execution → Outcome) |
| `skills.json` | Skill-cloud categories |
| `certifications.json` | Certification wall |
| `startup.json` | Qedence / "Building Beyond Work" section |
| `pharma.json` | Pharma x Tech vision section |
| `howithink.json` | "How I Think" mental-model strip |

To update your resume PDF, replace `public/resume/Mohammed_Zaid_Resume.pdf` — keep the
filename or update `resumePath` in `profile.json` to match.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact form (WhatsApp)

The contact form has no backend. When a visitor submits it, the browser:

1. Validates the fields (name and message required, plus an email or a phone number).
2. Builds a plain-text message and opens `https://wa.me/<number>?text=<message>` in a
   new tab, so WhatsApp shows the chat pre-filled. The visitor presses send.
3. Shows a fallback with *Try again* and *send by email* links, in case the tab was
   blocked or the visitor doesn't use WhatsApp.

The destination number is the `phone` field in `src/data/profile.json` (the same number
shown in the Contact section). Change it there; no environment variables are needed.

Trade-off: you only receive the enquiry if the visitor actually presses send in
WhatsApp. Nothing is stored on the site.

## Google Analytics (optional)

Set `NEXT_PUBLIC_GA_ID` (a GA4 measurement ID, e.g. `G-XXXXXXXXXX`) in `.env.local` /
your Vercel project settings to enable pageview tracking. Contact-form submissions
fire a `contact_form_submit` GA event automatically. Leave it unset to skip GA
entirely — nothing loads.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the repo → framework preset auto-detects
   Next.js — no config needed.
3. Optionally add `NEXT_PUBLIC_GA_ID` in **Project Settings → Environment Variables**
   to enable Google Analytics. Nothing else is required.
4. Deploy. That's it — no database, no separate backend service to provision.
5. Update `metadataBase` / sitemap URL in `src/app/layout.tsx` and
   `src/app/sitemap.ts` to your real production domain once you have one.

## Known items / suggestions for future improvement

- **Dependency security:** the project pins `next@14.2.35`, the latest patch on the
  14.x line, which resolves the critical/high CVEs disclosed against earlier 14.x
  releases. A handful of moderate/high advisories (mostly Server Components DoS and
  Image Optimization edge cases) are only fixed in Next 16, which is a major-version
  migration — worth planning as a deliberate upgrade rather than doing it inline here.
  Run `npm audit` before shipping to see current status.
- **Case study screenshots:** `projects.json` has no image field yet. Add a
  `screenshot` path per project and render it in the `Projects.tsx` detail panel once you
  have product screenshots to share (several listed projects are confidential
  client engagements, so screenshots may not be appropriate for all of them).
- **CMS migration path:** the JSON-in-`src/data` structure is deliberately shaped so
  it could be swapped for a headless CMS (Sanity, Contentful) later without touching
  component code — each component only depends on the JSON shape, not the file
  system.
- **Resume auto-sync:** today the PDF and the JSON content are updated independently.
  If they drift, the JSON wins (it's what renders). Keep both in sync manually when
  your resume changes.
- **Guaranteed lead capture:** because the WhatsApp form relies on the visitor
  pressing send, a submitted form is not a confirmed lead. If that matters, POST the
  same message to a form service (Formspree, Web3Forms) or a serverless function
  before opening WhatsApp.

# Mohammed Zaid — Portfolio

Premium, dynamic personal portfolio built with Next.js 14 (App Router), Tailwind CSS,
Framer Motion and a lightweight Three.js particle background. Frontend-only — no
database, no traditional backend. The single serverless piece is the contact form,
which posts to a Next.js API route that relays messages to Telegram.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Framer Motion** for section/scroll animations and micro-interactions
- **@react-three/fiber + three.js** for the hero's animated particle network
- **lucide-react** for icons
- All content lives in `src/data/*.json` — nothing about you is hardcoded in components

## Project structure

```
src/
  app/
    layout.tsx        — fonts, metadata, JSON-LD, analytics
    page.tsx           — assembles all sections
    sitemap.ts
    api/contact/route.ts — Telegram relay (edge function)
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

## Telegram contact form setup

The contact form has no database — every submission is relayed straight to your
Telegram via the Bot API, from the `/api/contact` edge function.

1. Message **@BotFather** on Telegram → `/newbot` → follow the prompts. Copy the bot
   token it gives you.
2. Send your new bot any message (e.g. "hi"), then visit, in a browser:
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   and copy the numeric `"chat":{"id": ...}` value — that's your chat ID.
3. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   TELEGRAM_BOT_TOKEN=your-token
   TELEGRAM_CHAT_ID=your-chat-id
   ```
4. Restart the dev server. Submitting the contact form now sends you a Telegram
   message formatted as:
   ```
   New Portfolio Contact
   Name: ...
   Email: ...
   Company: ...
   LinkedIn: ...
   Interest: ...
   Message: ...
   ```
5. Reply to the person by email — the form is a one-way notification, not a chat
   thread.

If the env vars are missing, the form fails gracefully with a message asking the
visitor to email you directly (it doesn't crash or silently drop the message).

## Google Analytics (optional)

Set `NEXT_PUBLIC_GA_ID` (a GA4 measurement ID, e.g. `G-XXXXXXXXXX`) in `.env.local` /
your Vercel project settings to enable pageview tracking. Contact-form submissions
fire a `contact_form_submit` GA event automatically. Leave it unset to skip GA
entirely — nothing loads.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the repo → framework preset auto-detects
   Next.js — no config needed.
3. Add environment variables in **Project Settings → Environment Variables**:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_GA_ID` (optional)
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
  `screenshot` path per project and render it in the `Projects.tsx` modal once you
  have product screenshots to share (several listed projects are confidential
  client engagements, so screenshots may not be appropriate for all of them).
- **CMS migration path:** the JSON-in-`src/data` structure is deliberately shaped so
  it could be swapped for a headless CMS (Sanity, Contentful) later without touching
  component code — each component only depends on the JSON shape, not the file
  system.
- **Resume auto-sync:** today the PDF and the JSON content are updated independently.
  If they drift, the JSON wins (it's what renders). Keep both in sync manually when
  your resume changes.
- **Rate limiting on the contact form:** since there's no database, there's no
  server-side rate limiting beyond the honeypot field. If spam becomes an issue,
  consider adding Vercel's edge rate limiting or a CAPTCHA (e.g. Cloudflare Turnstile).

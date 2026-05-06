# Tutor House Design System

A design system extracted from the **Tutor House** Next.js tutoring platform — a learner-meets-tutor marketplace with three roles (admin, student, tutor), session booking, and shadcn/ui-based UI.

## Source

- **Codebase**: mounted at `assingment-4-frontend/` (Next.js 16 + React 19 + TypeScript)
- **UI stack**: shadcn/ui (New York preset) on Tailwind CSS 4, neutral baseColor, Lucide icons, Radix primitives, next-themes for light/dark
- **Type**: Geist & Geist Mono (loaded via `next/font/google`)
- **Auth/data**: better-auth + a separate REST API (out of scope here)
- **Demo URL** (referenced in code): `https://assingment-4-frontend.vercel.app`

## What is Tutor House?

A platform where **students** browse vetted tutors, view profiles, and book hourly sessions on chosen days/time slots; **tutors** manage their availability and incoming bookings; **admins** moderate users, categories, and bookings. Branding is bold, gradient-forward (purple → pink → blue), with animated hero sections and frequent use of glassy/blurred surfaces.

## Index

```
/                            ← you are here
README.md                    ← brand overview, content + visual rules, iconography
colors_and_type.css          ← CSS variables (colors, type, radii, shadows)
SKILL.md                     ← Agent Skill manifest (cross-compatible w/ Claude Code)
preview/                     ← Design System tab cards (~700×N each)
assets/
  images/                    ← Real photos used by the product (tutors, classrooms)
  icons/                     ← Brand glyphs / logos / placeholder marks
ui_kits/
  marketing/                 ← Public site (home, tutors, about, login)
    README.md
    index.html               ← Interactive prototype: home → tutor list → tutor detail → login
    components/*.jsx
  dashboard/                 ← Authenticated app (student / tutor / admin)
    README.md
    index.html               ← Interactive prototype: sidebar + booking + admin tables
    components/*.jsx
```

> No slide template was provided, so `slides/` is intentionally absent.

## Brand identity

**Tutor House** — a single-word wordmark rendered in an animated 3-stop linear gradient (`blue-600 → purple-600 → pink-600`) with `bg-clip-text` and `animate-gradient` keyframe motion. There is no separate logo mark — the wordmark *is* the brand.

Tagline patterns observed in code:
- "Your Journey to Excellence Starts Here ✨"
- "Premium Learning Experience"
- "Empowering Minds, Shaping Futures"
- "Components made easy." (footer placeholder — likely leftover from shadcn template)

---

## Content fundamentals

**Voice**: friendly, aspirational, lightly hyperbolic. The brand sells a *feeling* of momentum (journey, future, breakthrough) more than feature lists.

**Tone**: warm + confident. Hero copy leans into emotion ("Empowering Minds, Shaping Futures"); body copy is direct and second-person ("Your perfect tutor is just a click away.").

**Person**: addresses the reader as **you** / **your**. Uses **we** for the company. ("We're on a mission to revolutionize education.")

**Casing**:
- **Title Case** for buttons, nav, section headings ("Get Started Free", "Browse Tutors", "Meet The Team")
- **Sentence case** for body copy and form helpers
- Eyebrow labels are **UPPERCASE** with wide tracking ("WHAT DRIVES US", "MEET THE TEAM", "OUR STORY")

**Sentence length**: short. Hero subtitles are 6–10 words. Paragraphs in About max ~3 sentences.

**Emoji**: yes, sparingly, as visual punctuation.
- ✨ in hero subtitle ("Your Journey to Excellence Starts Here ✨")
- 📅 🕐 ⭐ 📆 🆔 💰 ✅ 🚫 ⚠️ 📋 ▼ inside booking card UI
- Used as inline glyphs **next to labels**, not as decoration on cards or headings.

**Numbers / stats**: "500+", "15K+", "200+", "50+", "5+ Years" — always abbreviated with a "+", never spelled out.

**Punctuation quirks**:
- Em-dash for soft breaks ("Excellence is not just a goal — it's our standard.")
- Italicized inline gradient phrases ("It started with a *simple idea*")
- Booking card uses Bengali (`bn-BD` locale + Bangla day names + ৳ taka) — the product is built by a Bangladeshi developer for a Bangladesh-adjacent audience.

**Tone do's**:
- "Your perfect tutor is just a click away."
- "Every connection made on our platform is a step toward a world where quality education isn't a privilege — it's a right."

**Tone don'ts** (avoid corporate-speak):
- "Solutions". "Synergy". "Best-in-class".

---

## Visual foundations

### Colors
- **Neutral foundation** — shadcn/ui "neutral" base in OKLCH. Pure grayscale: `--background`, `--foreground`, `--muted`, `--border`. No tinted neutrals.
- **Brand gradient** — the hero of the system. A 3-stop `linear-gradient(to right, blue-600, purple-600, pink-600)` used on:
  - Wordmark text (clipped via `bg-clip-text`)
  - Primary CTAs ("Sign up", "Confirm Booking", "Get Started Free")
  - Underline accents under nav links (animated width on hover)
  - Pulse-glow horizontal divider under the hero
- **Secondary CTA gradient** — `indigo-600 → purple-600` (login, signup, booking confirm)
- **Soft tint backgrounds** — pastel blob fills (`purple-300`, `pink-300`, `yellow-300`, `blue-300`) at `opacity-30` with `blur-xl` and `mix-blend-multiply` for the animated hero "blob" backdrop
- **Functional**: indigo-600 for utility accents (tutor card price badge, slot-selected states, "View Details" links), red-600 destructive, amber/yellow stars, green for success.

### Type
- **Geist** (sans) and **Geist Mono** — only typefaces used. Loaded via `next/font/google`.
- Hero wordmark is `text-9xl font-black` (~128px desktop), gradient-clipped, with a blurred ghost copy underneath (`blur-2xl opacity-50 animate-pulse`) for a glow halo.
- Section h2: `text-4xl md:text-5xl font-bold`. Often two-tone — half plain `zinc-900`, half gradient-clipped ("Our Core **Values**").
- Body: `text-zinc-600 / text-zinc-400` (light / dark), `leading-relaxed`.
- Eyebrow labels: tiny pill (`px-3 py-1 rounded-full bg-purple-100`) with icon + UPPERCASE label.
- `tracking-tight` and `tracking-tighter` are pervasive on display sizes.

### Backgrounds
- **Animated blobs**: 4 blurred colored circles drifting on a `blob` keyframe over a soft `slate-50 → purple-50 → blue-50` linear gradient. Used on hero and About hero.
- **Floating particles**: 20 deterministic `1×1 px-1.5` purple dots floating up the viewport on `float-particle` infinite loop.
- **Section alternation**: white → pastel gradient strip → white. Never solid color blocks of the brand gradient as a *page background* — that's reserved for CTA cards.

### Animation
- Custom keyframes (in `globals.css`): `blob`, `shimmer`, `wave-text`, `slide-in-left`, `scale-in`, `fade-in`, `fade-in-down`, `fade-in-up`, `pulse-glow`, `color-shift`, `blink`, `border-glow`, `float-particle`, `gradient` (background-position scroll for animated text fills).
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (springy back-out) on `slide-in-left`. Mostly `ease-in-out` everywhere else.
- Durations: 200–300ms for interactions, 600ms–1s for entrances, 2–11s for ambient (blobs, particles, gradient drift).
- Staggered delays via `.animation-delay-{N}` utilities (0–6000ms).
- Hero letters slide in one-by-one (each `<span>` per letter with `animation-delay` increments of 50ms).

### Hover states
- **Buttons**: scale up (`hover:scale-105`), brighten (`from-X-700 to-Y-700`), gain a colored glow shadow (`hover:shadow-purple-500/50`).
- **Cards**: lift (`hover:-translate-y-1` or `-translate-y-2`), border shifts to purple (`hover:border-purple-300`), shadow grows.
- **Nav links**: animated underline width (`w-0 → w-full`, 300ms), text color shifts to `purple-600`.
- **Icons in cards**: `group-hover:scale-110` + sometimes `rotate-3` for playful tilt.

### Press states
- `active:scale-95` on the booking confirm button. Otherwise generally absent — relies on browser defaults.

### Borders
- Standard `border-zinc-100` / `border-zinc-200` / `dark:border-zinc-800`. Width is always `1px` except for **selected** chips/buttons (booking day picker, role picker, tutor "Available now" badges) which use `border-2` with `border-indigo-600`.

### Shadows
- Tiered: `shadow-sm` (cards at rest) → `shadow-md` (badges) → `shadow-lg` (CTA at rest) → `shadow-xl` / `shadow-2xl` (auth cards, focus card stack, CTA panel).
- **Tinted glow**: `shadow-purple-500/30`, `shadow-indigo-500/25` — colored shadows under primary CTAs and selected states. This is a key brand cue.
- Inner shadows: not used.

### Transparency / blur
- Sticky navbar: `backdrop-blur-xl bg-background/80 border-b border-border/40`.
- Auth card decorative circles: `bg-white/10 blur-2xl`.
- Pagination footer: `bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md`.
- Mobile sheet: `bg-background/95 backdrop-blur-xl`.
- Image overlays: `bg-gradient-to-t from-black/60 to-transparent` for caption legibility.

### Corner radii
- `rounded-md` (8px) — inputs, small buttons
- `rounded-lg` (10px) — main buttons, popover items
- `rounded-xl` (14px) — most CTAs
- `rounded-2xl` (18px) — content cards, tutor cards
- `rounded-3xl` (22px) — auth cards, "Story" hero card stack, CTA panels
- `rounded-full` — pills, badges, avatar circles, animated dots

### Cards
- **Default content card**: `rounded-2xl`, `border border-zinc-100`, `bg-white`, `shadow-md` at rest, `hover:shadow-2xl`, `hover:-translate-y-1`, `hover:border-purple-300`.
- **Auth card**: `rounded-3xl border-0 shadow-2xl overflow-hidden` with a colored gradient header banner (~80px) and a white body. The banner uses the indigo→purple→pink gradient and contains a `bg-white/20 backdrop-blur` icon chip.
- **Hero CTA card**: full gradient (`violet-600 → purple-600 → blue-600`) `rounded-3xl` with two large blurred white circles in opposite corners.
- **Stacked decorative cards**: 3 cards rotated `rotate-1` and `rotate-3` behind a main card to create a 3D tilt stack (About story section).

### Layout rules
- Container: `container mx-auto px-6 lg:px-10`.
- Sticky top nav (`top-0 z-50`).
- Pagination/footer can be `fixed bottom-0` with backdrop-blur.
- Card grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6`.
- Section vertical rhythm: `py-20` typical, `py-24` for hero, `py-32` for footer.

### Imagery vibe
- Photo-heavy carousel of teacher/student stock photos. Mix of webp / jpg / avif. Warm, classroom-y, lots of natural skin tones; no heavy filtering. Some grain on the avif assets. No black-and-white treatment.
- Photos sit inside `rounded-2xl` cards, `object-cover`, with `group-hover:scale-110` zoom over 500ms.

### Layout / fixed elements
- `Navbar1` sticks to top, blurs background.
- Pagination bar is a `fixed bottom-0` blurred strip.
- Floating particles on the hero are `pointer-events-none` overlays.

---

## Iconography

- **Library**: [`lucide-react`](https://lucide.dev) v0.575 — the project's only icon source. shadcn/ui's `components.json` declares `"iconLibrary": "lucide"`.
- **Style**: 1.5–2px stroke, rounded line-caps, monoline. Usually rendered at `w-4 h-4` (16px) or `w-5 h-5` (20px) in buttons and pills, `w-6 h-6` in card icon chips, `w-12 h-12` containers.
- **Color**: typically `text-zinc-400` at rest in inputs, `text-purple-600` on focus, white when sitting in a gradient pill.
- Icons frequently sit inside a **gradient-filled rounded square** (`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg`) — this is the canonical "icon chip" pattern.
- Icons referenced in code: `Book`, `Menu`, `Sunset`, `Trees`, `Zap`, `LogIn`, `UserPlus`, `Mail`, `Lock`, `Eye`, `EyeOff`, `User`, `ShieldCheck`, `AlertCircle`, `Star`, `BookOpen`, `Users`, `Award`, `Target`, `Heart`, `Sparkles`, `GraduationCap`, `Globe`, `Download`, `ArrowLeft`, `ArrowRight`.

- **Emoji**: yes — used as inline label glyphs in the booking card (📅 🕐 ⭐ 📆 🆔 💰 ✅ 🚫 ⚠️ 📋 ▼). Treat as **functional labels**, not decorative imagery.

- **SVG logos in `public/`**: `next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg` — these are **Next.js scaffolding artifacts**, NOT the Tutor House brand. The brand has no separate SVG mark; the wordmark is the logo.

- **Custom inline SVG**: a Google "G" logo is hand-rolled inside `LoginForm` for the "Continue with Google" button.

---

## Caveats

- **Geist via Google Fonts** — the codebase uses `next/font/google`, so this design system loads Geist via Google Fonts CDN at the top of `colors_and_type.css`. No font files needed locally.
- **No real logo asset** — the brand has no separate mark, only a wordmark. We render the wordmark as styled text everywhere.
- **No slide template** — the codebase has no decks, so `slides/` is omitted.
- **Mixed-language UI** — the booking flow contains Bengali (Bangla) microcopy (`৳`, day names, "অনুগ্রহ করে…"). The UI Kit recreations standardize on English to be useful for prototyping; the original Bengali strings are documented in the dashboard kit's README.

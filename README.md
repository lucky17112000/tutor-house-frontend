# Tutor House

**Where students find the right tutor — book a session, join a call, and leave a review.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TanStack](https://img.shields.io/badge/TanStack-Form-FF4154?style=flat-square)](https://tanstack.com)
[![ZegoCloud](https://img.shields.io/badge/ZegoCloud-Video%20Calls-1EA7FD?style=flat-square)](https://www.zegocloud.com)

---

## What is Tutor House?

Most tutoring platforms are just directories. Tutor House is a **full booking pipeline** — students discover tutors by subject, book a session with a specific date and time, join a live video call, and leave a review. Tutors manage their own profiles, rates, and incoming bookings. Admins oversee the whole platform. Everything is role-gated, everything is tracked.

---

## The Life of a Session for tutor house users1 | <<<<<<< HEAD

22 | export const getAllTutors = async (page: number = 1, limit: number = 4) => {

> 23 | =======

     | ^^^^^^^

24 | export const getAllTutors = async (page: number = 1, limit: number = 5) => {
25 | >>>>>>> afa85866013a6a9d91e24184f725ac3f34268be9
26 | try {

Every tutoring session on Tutor House takes this journey:

```
  STUDENT               PLATFORM               TUTOR               ADMIN
  ───────               ────────               ─────               ─────

  Browse tutors    →   View tutor profile  →  Receives booking →  Monitors all
  by subject            (subjects, rate,        in dashboard        bookings
       │                 reviews)                    │
       │                                             │
       ↓                                             ↓
  Book a session   →   PENDING status      →  Session confirmed
  (date + time)                                      │
                                                     ↓
                                              Join video call  →  Session COMPLETED
                                                                        │
                                                                        ↓
                                                               Student leaves review
```

Your dashboard always shows exactly where each booking stands.

---

## Who Uses Tutor House?

| You are...    | What you can do                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| **A visitor** | Browse the homepage, read about tutors, explore subject categories                                       |
| **A student** | Sign up, browse tutors, book sessions, join video calls, leave reviews, manage bookings                  |
| **A tutor**   | Create a profile, set subjects and hourly rate, manage incoming bookings, join video calls, view reviews |
| **An admin**  | Manage all users, tutors, bookings, and subject categories from a central dashboard                      |

Role separation is enforced server-side — the frontend reads your session token, the backend verifies it.

---

## What's Actually Happening Behind the UI

Authentication uses **better-auth** with cookie-based sessions. The Next.js App Router handles SSR data fetching on the server and passes hydrated state to the client:

```
  Browser                  Next.js Server              Backend API
  ───────                  ──────────────              ───────────

  Page request        →   Server Component        →   REST API (port 4000)
                           reads session cookie         returns data
                                │
                           Renders HTML with
                           prefetched data
                                │
                           React hydrates
                           on the client
```

This means:

- Session tokens are read server-side, never exposed in the browser bundle
- Pages render with real data on first load — no loading spinner for initial content
- Role-based routing is enforced at the middleware layer before any component renders

---

## Tech Stack

| Layer          | Technology                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| RENDERING      | [Next.js](https://nextjs.org) 16 App Router (SSR + RSC)                    |
| LANGUAGE       | [TypeScript](https://www.typescriptlang.org) 5                             |
| UI LAYER       | [React](https://react.dev) 19 + [Tailwind CSS](https://tailwindcss.com) v4 |
| COMPONENTS     | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)  |
| FORMS          | [TanStack Form](https://tanstack.com/form/latest) + [Zod](https://zod.dev) |
| AUTH           | [better-auth](https://better-auth.com) + cookie sessions + jwt-decode      |
| VIDEO CALLS    | [ZegoCloud UIKit](https://www.zegocloud.com)                               |
| CAROUSEL       | [Embla Carousel](https://www.embla-carousel.com) + autoplay plugin         |
| NOTIFICATIONS  | [Sonner](https://sonner.emilkowal.ski)                                     |
| THEMING        | [next-themes](https://github.com/pacocoursey/next-themes) (dark mode)      |
| ENV VALIDATION | [@t3-oss/env-nextjs](https://env.t3.gg)                                    |
| BUILD          | [npm](https://npmjs.com)                                                   |

---

## Pages at a Glance

```
/                                    Landing — hero, featured tutors, categories, reviews, FAQ
/tutor                               Browse all tutors (paginated, filterable)
/tutor/[id]                          Full tutor profile — subjects, rate, reviews, book button
/login                               Student / tutor / admin login
/signup                              New account registration
/about                               About the platform
/blog                                Blog
/contact                             Contact page
/review                              Public reviews
/privacy                             Privacy policy
/terms                               Terms of service

/dashboard                           Role-aware dashboard (redirects by role)

── STUDENT DASHBOARD ─────────────────────────────────────────────────────────
/dashboard/analytics                 Booking stats overview
/dashboard/profile                   Manage student profile
/dashboard/mytutor                   All booked tutors and session history
/dashboard/createBook/[id]           Book a session with a specific tutor

── TUTOR DASHBOARD ───────────────────────────────────────────────────────────
/dashboard/analytics                 Teaching activity overview
/dashboard/profile                   Manage tutor profile
/dashboard/create                    Create / set up tutor profile (subjects, rate)
/dashboard/my-tutor                  Preview your public tutor profile
/dashboard/booking                   Incoming bookings from students
/dashboard/myreview                  Reviews received from students
/dashboard/video-call                Join a live video call session

── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
/dashboard/analytics                 Platform-wide stats
/dashboard/users                     Manage all registered users
/dashboard/category                  Create and manage subject categories
/dashboard/course                    Course management
/dashboard/booking                   View and manage all bookings
/dashboard/profile                   Admin profile

── VIDEO ─────────────────────────────────────────────────────────────────────
/call/[id]                           Live video call room (ZegoCloud)
```

---

## Get Running Locally

**1. Clone and install**

```bash
git clone https://github.com/lucky17112000/assingment-4-frontend.git
cd assingment-4-frontend
npm install
```

**2. Set up environment**

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
BETTER_AUTH_SECRET=your_auth_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> `BETTER_AUTH_SECRET` must match the value used by the backend to sign sessions.

**3. Start dev server**

```bash
npm run dev
# opens at http://localhost:3000
```

---

## Demo Credentials

```
ADMIN
  email:    alaminmstafarahim17112000@gmail.com
  password: 12345678

TUTOR
  email:    alamingithub17112000@gmail.com
  password: 12345678

STUDENT
  email:    ajubayer319@gmail.com
  password: 12345678
```

---

## Video Walkthrough

[Watch on YouTube](https://www.youtube.com/watch?v=V6SapDXUjrI)

---

## Project Layout

```
src/
├── app/
│   ├── (commonLayout)/              # Public: home, tutor browse, about, blog, contact
│   │   └── (authRouteGroup)/        # Login, signup
│   ├── (dshBoardLayout)/
│   │   ├── @admin/dashboard/        # Admin: users, categories, bookings, analytics
│   │   ├── @student/dashboard/      # Student: bookings, my tutors, profile
│   │   └── @tutor/dashboard/        # Tutor: profile, bookings, reviews, video call
│   └── call/[id]/                   # Video call room
│
├── components/
│   ├── modules/                     # Feature components: auth, dashboard, home, tutor, booking
│   ├── shared/                      # Navbar, footer, reusable form fields
│   └── ui/                          # shadcn-style primitives
│
├── service/                         # API functions: auth, booking, tutor, admin
├── actions/                         # Server actions: signin, review
├── lib/                             # auth-client, utilities
├── types/                           # Shared TypeScript interfaces
├── zod/                             # Validation schemas
├── env.ts                           # Type-safe environment variable config
└── hooks/                           # Custom React hooks
```

---

## Environment Variables

| Variable                   | Required | Purpose                                 |
| -------------------------- | -------- | --------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes      | Points to the backend REST API          |
| `BETTER_AUTH_SECRET`       | Yes      | Signs and verifies session tokens       |
| `NEXT_PUBLIC_APP_URL`      | No       | App origin (defaults to localhost:3000) |

---

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## Deployment Notes (Vercel)

Add `NEXT_PUBLIC_API_BASE_URL` and `BETTER_AUTH_SECRET` to **all three environments** (Production, Preview, Development) in Vercel project settings.

Routes that read session cookies render dynamically by design — do not force static generation on auth-gated pages.

---

## Known Gotchas

> **`NEXT_PUBLIC_API_BASE_URL is not defined`**  
> The variable exists in `.env.local` locally but must also be set explicitly in Vercel. It is NOT auto-inherited.

> **`Dynamic server usage` during build**  
> Expected. Any route reading session cookies at request time is dynamic. This is intentional, not a bug.

> **Video calls require both participants to be on the same room ID**  
> The ZegoCloud room is identified by the booking ID — both student and tutor must use the same ID to connect.

---

<div align="center">

Built by **Alamin Mustafa Rahim** · Tutor House Full-Stack Mission

_Backend runs separately — this repo is the frontend only._

</div>

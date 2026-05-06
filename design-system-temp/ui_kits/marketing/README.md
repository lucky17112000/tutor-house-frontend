# Marketing UI Kit — Tutor House

Public-facing marketing site: home, tutor browse, tutor detail (with booking flow), about, login/signup.

## Components

| File | Purpose |
| --- | --- |
| `Navbar.jsx` | Sticky glassy nav with gradient wordmark + animated underline on active link |
| `Hero.jsx` | Animated blob backdrop, gradient display heading, CTA pair, stat row |
| `TutorCard.jsx` | Image + price badge + name + bio + 5-star rating + view link |
| `TutorList.jsx` | Eyebrow + headline + category chip filter + grid |
| `TutorDetail.jsx` | Photo header, stats strip, about copy, sticky booking card with day/slot picker |
| `About.jsx` | "What Drives Us" values grid + tilted 3D story stack |
| `CTASection.jsx` | Full-bleed gradient panel with two blurred white circles |
| `Footer.jsx` | Dark-mode footer with link columns |
| `Auth.jsx` | Login & signup card, gradient banner header, role picker, Google SSO |

## Interactive flow

`index.html` ties them together as a click-thru prototype:

1. **Home** — Hero → 4 featured tutors → CTA → footer
2. **Tutors** — full grid with category filter
3. **Tutor detail** — click a tutor → image header + stats + booking card (pick day, pick slot, confirm → toast)
4. **About** — values grid + story stack
5. **Login / Signup** — switch mode in-card, role picker on signup

State is held in a single `<App>` with route + activeTutor + toast.

## Source mapping

Recreated from `assingment-4-frontend/src/`:

- `app/page.tsx` → home
- `components/Home/carousel/`, `Home/about/`, `Home/footer/` → hero/about/footer
- `components/tutor/tutorrCard.tsx` → `TutorCard.jsx`
- `components/booking/BookingCard.tsx` → booking inset on `TutorDetail.jsx`
- `components/login-form.tsx`, `signup-form.tsx` → `Auth.jsx`

## Notes

- The original product mixes English + Bengali (Bangla) microcopy in the booking card (e.g. "অনুগ্রহ করে…", `৳` taka). The kit standardizes on English.
- Lucide icons are substituted with emoji glyphs in this kit for portability — swap them back via `<svg>` if loading Lucide.
- All photos come from `assets/images/` (real photos shipped with the product).

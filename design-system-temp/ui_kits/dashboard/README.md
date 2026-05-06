# Dashboard UI Kit — Tutor House

Authenticated app: student / tutor / admin views, all behind a role switcher in the sidebar.

## Components

| File | Purpose |
| --- | --- |
| `DashSidebar.jsx` | Sticky left sidebar — gradient wordmark, role switcher segmented control, role-aware nav, user footer |
| `TopBar.jsx` | Page title, subtitle, search w/ ⌘K, notification bell, optional action |
| `StatCards.jsx` | KPI tiles — gradient icon chip, big number, %-delta vs last month |
| `DataTable.jsx` | Generic table with column renderers + row actions |
| `BookingRow.jsx` | Booking line item w/ image, day, time, status pill, role-aware actions |
| `AvailabilityEditor.jsx` | Weekly slot grid — click cells to toggle; gradient fill on active |

## Roles & routes

- **Student** — Browse Tutors · My Bookings · Messages · Profile
- **Tutor** — Overview · Bookings · Availability · Earnings
- **Admin** — Overview · Users · Tutors · Categories · Bookings

The sidebar's role switcher swaps the entire nav set and lands on each role's home route.

## Source mapping

Recreated from `assingment-4-frontend/src/`:

- `app/(dshBoardLayout)/@admin|@student|@tutor/dashboard/*` → role-specific routes
- `components/app-sidebar.tsx` → `DashSidebar.jsx` (the source is a stub; this kit fills it out using the product's wordmark + shadcn sidebar idioms)
- `components/booking/BookingCard.tsx` → `BookingRow.jsx` (compact list form rather than full booking flow — that lives in the marketing kit's `TutorDetail.jsx`)
- `components/adminCatgory/`, `components/dashboard/*` → admin tables

## Notes

- **Bengali strings** in the original booking card (e.g. `অনুগ্রহ করে`, `৳`) are not reproduced here — this kit standardizes on English. Original strings are preserved in the codebase for reference.
- `Messages`, `Profile`, `Earnings`, `Bookings` (admin) and `Tutors` (admin) reuse the user-list table or render a stub — they're navigable but not deeply built out.
- All tables use neutral hover and the brand gradient only on KPI icons + sidebar active rail. No gradient backgrounds on data surfaces — that's intentional, to keep the working canvas calm.

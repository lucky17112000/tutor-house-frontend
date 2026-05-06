---
name: tutor-house-design
description: Use this skill to generate well-branded interfaces and assets for Tutor House, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key starting points:
- `README.md` — brand overview, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — drop-in CSS variables (gradients, neutrals, type, radii, shadows)
- `assets/images/` — real photos used by the product (tutors, classrooms)
- `ui_kits/marketing/` — public site components (hero, tutor card, booking flow, auth)
- `ui_kits/dashboard/` — authenticated app components (sidebar, tables, KPIs, availability editor)
- `preview/` — small reference cards for every token, color, and component

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The brand wordmark is rendered as styled gradient text — there is no separate logo asset.

If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand. The product stack is Next.js 16 / React 19 / Tailwind 4 / shadcn/ui (New York) / Lucide icons.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

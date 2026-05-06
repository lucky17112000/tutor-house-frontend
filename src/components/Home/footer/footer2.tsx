"use client";

const FOOTER_COLS = [
  {
    heading: "Product",
    links: [
      { text: "Tutors", href: "/tutor" },
      { text: "Subjects", href: "#" },
      { text: "Pricing", href: "#" },
      { text: "Become a tutor", href: "/signup" },
    ],
  },
  {
    heading: "Company",
    links: [
      { text: "About us", href: "/about" },
      { text: "Our mission", href: "/about" },
      { text: "Blog", href: "/blog" },
      { text: "Careers", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { text: "Dashboard", href: "/dashboard" },
      { text: "Community", href: "#" },
      { text: "FAQ", href: "#" },
      { text: "Contact us", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { text: "Terms", href: "/terms" },
      { text: "Privacy policy", href: "/privacy" },
      { text: "Cookies", href: "#" },
      { text: "Acceptable use", href: "#" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.95 10.95 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
];

export function Footer2() {
  return (
    <footer
      className="text-white pt-14 pb-9 px-6 sm:px-10 md:px-14 lg:pt-24 lg:pb-9 lg:px-16"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-12 mb-12 lg:mb-18">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="grid place-items-center text-white font-black tracking-[-0.05em] shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "#1d4ed8",
                  borderRadius: 9,
                  fontSize: 18,
                }}
              >
                th
              </div>
              <span className="font-extrabold text-[22px] tracking-[-0.03em]">
                tutorhouse
              </span>
            </div>
            <p
              className="mb-6"
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "30ch",
              }}
            >
              A better way to find a tutor that gets you. Built by educators for
              learners everywhere.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid place-items-center text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#1d4ed8";
                    el.style.borderColor = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "rgba(255,255,255,0.16)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h5
                className="mb-5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {col.heading}
              </h5>
              <ul className="grid gap-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="transition-all duration-200 inline-block"
                      style={{
                        fontSize: 14.5,
                        color: "rgba(255,255,255,0.78)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "#fff";
                        el.style.paddingLeft = "6px";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "rgba(255,255,255,0.78)";
                        el.style.paddingLeft = "0";
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between gap-6 flex-wrap pt-7"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: 13.5,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div>© 2026 Tutor House Inc. — Made with care.</div>
          <div className="flex gap-6">
            <a
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </a>
            <a
              href="/contact"
              className="transition-colors duration-200 hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

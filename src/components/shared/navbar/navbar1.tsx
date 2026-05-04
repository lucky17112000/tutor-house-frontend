"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ModeToggle } from "../ModeChange/ModeToggle";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Tutors", href: "/tutor" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const MORE_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/review" },
];

const Navbar1 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const router = useRouter();
  const session = authClient.useSession();
  const isLoggedIn = Boolean(session.data?.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled
            ? "px-12 py-3.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-black/6 dark:border-white/6 shadow-[0_8px_30px_-8px_rgba(10,10,10,0.08)]"
            : "px-12 py-5.5 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-extrabold text-[22px] tracking-[-0.03em]"
        >
          <span className="w-8 h-8 bg-blue-700 rounded-lg grid place-items-center text-white font-black text-base tracking-[-0.05em] shrink-0 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
            T
          </span>
          <span
            className={`transition-colors duration-400 ${
              scrolled ? "text-zinc-900 dark:text-white" : "text-white"
            }`}
          >
            tutorhouse
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative px-4 py-2.5 text-[14.5px] font-medium rounded-lg transition-colors duration-300 ${
                  scrolled
                    ? "text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ${
                    scrolled ? "bg-blue-700 dark:bg-blue-400" : "bg-white"
                  }`}
                />
              </Link>
            </li>
          ))}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onFocus={() => setMoreOpen(true)}
              className={`group inline-flex items-center gap-1.5 px-4 py-2.5 text-[14.5px] font-medium rounded-lg transition-colors duration-300 ${
                scrolled
                  ? "text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-400"
                  : "text-white/90 hover:text-white"
              }`}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${
                  moreOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {moreOpen && (
              <div
                className={`absolute right-0 mt-2 w-44 rounded-xl border shadow-lg overflow-hidden ${
                  scrolled
                    ? "bg-white/95 dark:bg-zinc-900/95 border-black/10 dark:border-white/15"
                    : "bg-white/95 dark:bg-zinc-900/95 border-black/10 dark:border-white/15"
                }`}
                role="menu"
              >
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-[14px] font-medium text-zinc-700 hover:text-blue-700 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:text-blue-300 dark:hover:bg-zinc-800 transition-colors"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className={`hidden lg:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:text-white hover:shadow-[0_14px_28px_-8px_rgba(29,78,216,0.55)] ${
                  scrolled
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                    : "bg-white text-zinc-900"
                }`}
              >
                Get started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                router.push("/");
              }}
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:text-white hover:shadow-[0_14px_28px_-8px_rgba(29,78,216,0.55)] ${
                scrolled
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                  : "bg-white text-zinc-900"
              }`}
            >
              Logout
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrolled
                ? "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-16 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[15px] font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              More
            </div>
            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[15px] font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-full text-sm font-semibold border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-700 hover:text-blue-700 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    await authClient.signOut();
                    setMobileOpen(false);
                    router.push("/");
                  }}
                  className="flex-1 text-center px-4 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Navbar1 };

"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronDown, Menu, X,
  GraduationCap, MessageCircle, LayoutDashboard, FileText, Lock,
  Info, BookOpen, Star, ArrowRight, LogOut, Zap,
} from "lucide-react";
import { ModeToggle } from "../ModeChange/ModeToggle";
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Tutors",    href: "/tutor",     Icon: GraduationCap },
  { label: "Contact",   href: "/contact",   Icon: MessageCircle },
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Terms",     href: "/terms",     Icon: FileText },
  { label: "Privacy",   href: "/privacy",   Icon: Lock },
];

const MORE_LINKS = [
  { label: "About us", href: "/about",  Icon: Info,     desc: "Our story & mission" },
  { label: "Blog",     href: "/blog",   Icon: BookOpen, desc: "Tips & learning guides" },
  { label: "Reviews",  href: "/review", Icon: Star,     desc: "What students say" },
];

const Navbar1 = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen]     = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const session  = authClient.useSession();
  const isLoggedIn = Boolean(session.data?.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] px-4 sm:px-8 lg:px-12 ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl border-b border-black/6 dark:border-white/6 shadow-[0_8px_48px_-8px_rgba(10,10,10,0.12),0_1px_0_0_rgba(0,0,0,0.04)]"
            : "py-5 bg-linear-to-b from-black/30 to-transparent backdrop-blur-sm border-b border-transparent"
        }`}
      >
        {/* ── Brand ── */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-extrabold text-[22px] tracking-[-0.03em] shrink-0"
        >
          {/* Logo mark — continuous animated */}
          <span
            className="relative w-8 h-8 bg-blue-700 rounded-lg grid place-items-center text-white font-black text-base tracking-[-0.05em] shrink-0 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 overflow-hidden"
            style={{ animation: "logo-glow 2.4s ease-in-out infinite" }}
          >
            {/* Sweeping shimmer across face */}
            <span
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              style={{ animation: "logo-shimmer 2.8s ease-in-out infinite" }}
            />
            {/* Letter */}
            <span className="relative z-10">T</span>

            {/* Orbiting dot 1 */}
            <span
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-0.75 -ml-0.75 rounded-full bg-blue-300 pointer-events-none"
              style={{ animation: "orbit 3s linear infinite" }}
            />
            {/* Orbiting dot 2 — offset half orbit */}
            <span
              className="absolute top-1/2 left-1/2 w-1 h-1 -mt-0.5 -ml-0.5 rounded-full bg-blue-200/70 pointer-events-none"
              style={{ animation: "orbit-reverse 4.5s linear infinite" }}
            />
          </span>
          <span className={`transition-all duration-400 ${scrolled ? "text-zinc-900 dark:text-white" : "text-white"}`}>
            tutorhouse
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden lg:flex items-center gap-0.5 list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group relative inline-flex items-center px-4 py-2 rounded-xl text-[14px] font-medium transition-all duration-300 overflow-hidden ${
                    active
                      ? scrolled
                        ? "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                        : "text-white bg-white/15"
                      : scrolled
                      ? "text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {/* Radial glow on hover */}
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: scrolled
                        ? "radial-gradient(ellipse at 50% 120%, rgba(59,130,246,0.14) 0%, transparent 65%)"
                        : "radial-gradient(ellipse at 50% 120%, rgba(255,255,255,0.14) 0%, transparent 65%)",
                    }}
                  />
                  {/* Hover bg fill */}
                  <span
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                      scrolled ? "bg-blue-50 dark:bg-blue-950/30" : "bg-white/10"
                    }`}
                  />

                  {/* Label */}
                  <span className="relative">{label}</span>

                  {/* Sweep line on hover */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-px rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      scrolled
                        ? "bg-linear-to-r from-blue-500 via-blue-300 to-transparent"
                        : "bg-linear-to-r from-white via-white/60 to-transparent"
                    }`}
                  />

                  {/* Active indicator — glowing pill bar */}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.75 w-7 rounded-full transition-all duration-300 ${
                        scrolled
                          ? "bg-blue-500 shadow-[0_0_10px_3px_rgba(59,130,246,0.55)]"
                          : "bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.45)]"
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}

          {/* More dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={`group relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[14px] font-medium transition-all duration-300 overflow-hidden ${
                scrolled
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400"
                  : "text-white/80 hover:text-white"
              }`}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
            >
              {/* Ecospark glow */}
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{
                  background: scrolled
                    ? "radial-gradient(ellipse at 50% 120%, rgba(59,130,246,0.14) 0%, transparent 65%)"
                    : "radial-gradient(ellipse at 50% 120%, rgba(255,255,255,0.14) 0%, transparent 65%)",
                }}
              />
              <span className={`absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${scrolled ? "bg-blue-50 dark:bg-blue-950/30" : "bg-white/10"}`} />

              <Zap className="relative size-3.5 shrink-0 opacity-0 scale-50 -translate-x-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-250" />
              <span className="relative">More</span>
              <ChevronDown
                className={`relative size-3.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute right-0 top-full pt-2 transition-all duration-300 ${
                moreOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="w-60 rounded-2xl border bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border-black/8 dark:border-white/10 shadow-[0_20px_60px_-12px_rgba(10,10,10,0.22)] overflow-hidden p-1.5">
                {MORE_LINKS.map(({ label, href, Icon, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className="group flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
                    role="menuitem"
                  >
                    <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 flex items-center justify-center transition-colors duration-200 shrink-0">
                      <Icon className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {label}
                      </div>
                      <div className="text-[11.5px] text-zinc-400 dark:text-zinc-500 truncate">{desc}</div>
                    </div>
                    <ArrowRight className="size-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 ml-auto shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className={`hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_0_24px_4px_rgba(29,78,216,0.45)] ${
                  scrolled
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white"
                    : "bg-white text-zinc-900 hover:bg-blue-50"
                }`}
              >
                Get started
                <ArrowRight className="size-3.5" />
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                router.push("/");
              }}
              className={`hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 group ${
                scrolled
                  ? "border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                  : "border border-white/25 text-white/75 hover:text-white hover:border-red-400/50 hover:bg-red-500/10"
              }`}
            >
              <LogOut className="size-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              Sign out
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              scrolled
                ? "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                : "text-white hover:bg-white/15"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100 dark:border-zinc-800">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 font-extrabold text-[20px] tracking-[-0.03em] text-zinc-900 dark:text-white">
              <span className="w-7 h-7 bg-blue-700 rounded-lg grid place-items-center text-white font-black text-sm">T</span>
              tutorhouse
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ label, href, Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-blue-100 dark:bg-blue-900/40" : "bg-zinc-100 dark:bg-zinc-800"}`}>
                    <Icon className={`size-4 ${active ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`} />
                  </span>
                  {label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </Link>
              );
            })}

            {/* Divider + More section */}
            <div className="pt-2 pb-1 px-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">More</span>
            </div>
            {MORE_LINKS.map(({ label, href, Icon, desc }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200"
              >
                <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-zinc-500 dark:text-zinc-400" />
                </span>
                <div>
                  <div>{label}</div>
                  <div className="text-[12px] text-zinc-400 font-normal">{desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="px-4 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex gap-2 mt-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-full text-sm font-semibold border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-600 hover:text-blue-700 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
                  >
                    Get started <ArrowRight className="size-3.5" />
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <LogOut className="size-4" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Navbar1 };

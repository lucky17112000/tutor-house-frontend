"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users2, GraduationCap, Tag, CalendarCheck,
  CalendarDays, Search, UserCog, User, ChevronDown, ChevronLeft,
  Home, LogOut, Menu, X, Shield, Star, BookMarked, Bell,
  Mail, Clock,
} from "lucide-react";
import { createAuthClient } from "better-auth/client";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface NavChild  { id: string; name: string; emoji: string }
interface NavItem   { name: string; href: string; icon: React.ReactNode; badge?: number; children?: NavChild[]; section?: string }
interface DashboardLayoutProps { children: React.ReactNode; user?: any; categories?: { id: string; name: string }[] }

/* ─── Constants ─── */
const ICON_MAP: Record<string, string> = {
  math: "➕", physics: "⚛️", chemistry: "🧪", bangla: "অ",
  english: "🔤", biology: "🧬", ict: "💻", programming: "👨‍💻",
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":            "Overview",
  "/dashboard/users":      "Manage Users",
  "/dashboard/course":     "Manage Tutors",
  "/dashboard/category":   "Manage Categories",
  "/dashboard/booking":    "Bookings",
  "/dashboard/createBook": "My Bookings",
  "/dashboard/create":     "Setup Profile",
  "/dashboard/profile":    "My Profile",
  "/dashboard/myreview":   "My Reviews",
  "/dashboard/mytutor":    "My Tutors",
  "/tutor":                "Browse Tutors",
};

const ROLE_CONFIG = {
  admin:   { label: "Admin",   gradient: "from-red-500 to-orange-500",   badge: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" },
  tutor:   { label: "Tutor",   gradient: "from-blue-600 to-indigo-600",  badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
  student: { label: "Student", gradient: "from-emerald-500 to-teal-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
};

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: { credentials: "include" },
});

/* ─── Nav configs ─── */
function getNavItems(role: string, cats: NavChild[]): NavItem[] {
  if (role === "admin") return [
    { name: "Overview",          href: "/dashboard",          icon: <LayoutDashboard className="size-4.5" />, section: "Dashboard" },
    { name: "Manage Users",      href: "/dashboard/users",    icon: <Users2 className="size-4.5" />,         section: "Management" },
    { name: "Manage Tutors",     href: "/dashboard/course",   icon: <GraduationCap className="size-4.5" />,  section: "Management" },
    { name: "Manage Categories", href: "/dashboard/category", icon: <Tag className="size-4.5" />,            section: "Management" },
    { name: "Manage Bookings",   href: "/dashboard/booking",  icon: <CalendarCheck className="size-4.5" />,  section: "Management" },
    { name: "My Profile",        href: "/dashboard/profile",  icon: <User className="size-4.5" />,           section: "Account" },
  ];
  if (role === "tutor") return [
    { name: "Overview",      href: "/dashboard",          icon: <LayoutDashboard className="size-4.5" />, section: "Dashboard" },
    { name: "Setup Profile", href: "/dashboard/create",   icon: <UserCog className="size-4.5" />,         section: "Teaching", children: cats },
    { name: "My Bookings",   href: "/dashboard/booking",  icon: <CalendarDays className="size-4.5" />,    section: "Teaching" },
    { name: "My Reviews",    href: "/dashboard/myreview", icon: <Star className="size-4.5" />,            section: "Teaching" },
    { name: "My Profile",    href: "/dashboard/profile",  icon: <User className="size-4.5" />,            section: "Account" },
  ];
  if (role === "student") return [
    { name: "Overview",       href: "/dashboard",             icon: <LayoutDashboard className="size-4.5" />, section: "Dashboard" },
    { name: "Browse Tutors",  href: "/tutor",                 icon: <Search className="size-4.5" />,         section: "Learning" },
    { name: "My Bookings",    href: "/dashboard/createBook",  icon: <CalendarDays className="size-4.5" />,   section: "Learning" },
    { name: "My Tutors",      href: "/dashboard/mytutor",     icon: <Users2 className="size-4.5" />,         section: "Learning" },
    { name: "My Profile",     href: "/dashboard/profile",     icon: <User className="size-4.5" />,           section: "Account" },
  ];
  return [{ name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="size-4.5" />, section: "Dashboard" }];
}

/* ─── Main Component ─── */
export default function DashboardLayout({ children, user, categories = [] }: DashboardLayoutProps) {
  const pathname   = usePathname();
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop]     = useState<string | null>(null);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* SSR placeholder */
  if (!mounted) return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800" />
        <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
      </div>
    </div>
  );

  const role = (user?.role ?? "").toLowerCase();
  const roleCfg = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.student;

  const categoryItems: NavChild[] = (
    categories.length > 0 ? categories
    : [{ id: "math", name: "Math" }, { id: "physics", name: "Physics" }, { id: "chemistry", name: "Chemistry" }, { id: "english", name: "English" }]
  ).map((c) => ({ id: c.id, name: c.name, emoji: ICON_MAP[c.name.toLowerCase()] ?? "📖" }));

  const navItems   = getNavItems(role, categoryItems);
  const pageTitle  = PAGE_TITLES[pathname] ?? "Dashboard";
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : null;
  const initials   = (user?.name ?? user?.email ?? "U").split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const handleLogout = async () => {
    await authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
  };

  /* ── Sidebar ── */
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">

      {/* Brand row */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
        <div className={cn("flex items-center gap-2.5 overflow-hidden transition-all duration-300", collapsed && !isMobile ? "w-0 opacity-0" : "opacity-100")}>
          <Link href="/" className="group flex items-center gap-2.5 font-extrabold text-[17px] tracking-[-0.03em]">
            <span className="w-8 h-8 bg-blue-700 rounded-xl grid place-items-center text-white font-black text-sm shrink-0 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:shadow-[0_0_16px_4px_rgba(29,78,216,0.4)]">
              T
            </span>
            <span className="text-zinc-900 dark:text-white whitespace-nowrap">tutorhouse</span>
          </Link>
        </div>

        {/* Collapse / expand button */}
        <button
          onClick={() => !isMobile && setCollapsed((c) => !c)}
          className={cn(
            "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
            "text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400",
            "hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-transparent hover:border-blue-100 dark:hover:border-blue-900",
            isMobile && "invisible",
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={cn("size-4 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Collapsed brand icon only */}
      {collapsed && !isMobile && (
        <div className="flex justify-center py-3 border-b border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="group w-8 h-8 bg-blue-700 rounded-xl grid place-items-center text-white font-black text-sm transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110">
            T
          </Link>
        </div>
      )}

      {/* Role badge strip */}
      {(!collapsed || isMobile) && (
        <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold", roleCfg.badge)}>
            {role === "admin"   && <Shield className="size-3" />}
            {role === "tutor"   && <Star className="size-3" />}
            {role === "student" && <BookMarked className="size-3" />}
            {roleCfg.label}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navItems.map((item, index) => {
          const showSection = (!collapsed || isMobile) && item.section &&
            (index === 0 || navItems[index - 1]?.section !== item.section);
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isOpen   = openDrop === item.name;

          const baseLink = cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 relative group",
            isActive
              ? "bg-blue-600 text-white shadow-[0_4px_16px_-4px_rgba(29,78,216,0.5)]"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
          );

          const iconCls = cn("shrink-0 transition-colors duration-200",
            isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
          );

          const sectionLabel = showSection && (
            <div className={cn("flex items-center gap-2 px-3 pt-4 pb-1.5", index === 0 && "pt-2")}>
              <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                {item.section}
              </span>
              <span className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            </div>
          );

          if (item.children) return (
            <div key={item.name}>
              {sectionLabel}
              <button onClick={() => setOpenDrop(isOpen ? null : item.name)} className={baseLink}>
                {isActive && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-white/60" />}
                <span className={iconCls}>{item.icon}</span>
                {(!collapsed || isMobile) && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-300", isOpen && "rotate-180")} />
                  </>
                )}
              </button>
              {isOpen && (!collapsed || isMobile) && (
                <ul className="mt-1 ml-3 pl-3 border-l-2 border-blue-100 dark:border-blue-900/40 space-y-0.5">
                  {item.children.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`${item.href}?categoryId=${cat.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                        <span>{cat.emoji}</span><span>{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          return (
            <div key={item.name}>
              {sectionLabel}
              <Link href={item.href} className={baseLink}>
                {isActive && !isMobile && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-white/60" />}
                <span className={iconCls}>{item.icon}</span>
                {(!collapsed || isMobile) && <span className="flex-1">{item.name}</span>}
                {(!collapsed || isMobile) && item.badge && (
                  <span className="bg-white/25 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom — profile + actions */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 p-2.5 space-y-1 shrink-0">

        {/* Profile card */}
        {user && (!collapsed || isMobile) && (
          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 p-3 mb-1">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center text-white font-extrabold text-sm shadow-md"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`, backgroundImage: `linear-gradient(135deg,#1d4ed8,#7c3aed)` }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-zinc-900 dark:text-white truncate leading-tight">{user.name ?? "User"}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Mail className="size-2.5 text-zinc-400 shrink-0" />
                  <span className="text-[10.5px] text-zinc-400 truncate">{user.email}</span>
                </div>
              </div>
            </div>
            {joinedDate && (
              <div className="flex items-center gap-1.5 mt-2.5 text-zinc-400 dark:text-zinc-500">
                <Clock className="size-3 shrink-0" />
                <span className="text-[10.5px]">Joined {joinedDate}</span>
              </div>
            )}
          </div>
        )}

        {/* Collapsed avatar */}
        {user && collapsed && !isMobile && (
          <div className="flex justify-center py-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-md"
              style={{ backgroundImage: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>
              {initials}
            </div>
          </div>
        )}

        {/* Home link */}
        <Link href="/"
          className={cn("flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white transition-all duration-200 group",
            collapsed && !isMobile && "justify-center")}>
          <Home className="size-4 shrink-0 group-hover:scale-110 transition-transform duration-200" />
          {(!collapsed || isMobile) && <span>Back to home</span>}
        </Link>

        {/* Logout */}
        <button onClick={handleLogout}
          className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200 group",
            collapsed && !isMobile && "justify-center")}>
          <LogOut className="size-4 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside className={cn(
        "hidden lg:flex flex-col shrink-0 bg-white dark:bg-zinc-900",
        "border-r border-zinc-100 dark:border-zinc-800",
        "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden",
        collapsed ? "w-17" : "w-64",
      )}>
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ── */}
      <div className={cn("fixed inset-0 z-30 lg:hidden transition-all duration-300",
        mobileOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <div className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)} />
        <aside className={cn(
          "absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-900",
          "border-r border-zinc-100 dark:border-zinc-800 overflow-y-auto",
          "transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}>
          <SidebarContent isMobile />
        </aside>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className={cn(
          "h-16 shrink-0 flex items-center gap-3 px-4 sm:px-6",
          "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md",
          "border-b border-zinc-100 dark:border-zinc-800",
          "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]",
        )}>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Page title + breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1.5 h-5 rounded-full bg-blue-600 shrink-0" />
            <h1 className="text-[15px] font-extrabold text-zinc-900 dark:text-white tracking-tight truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Spacer */}
          <div className="ml-auto flex items-center gap-2">

            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-white transition-all duration-200">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-white dark:ring-zinc-900" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800" />

            {/* User chip */}
            {user && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white font-extrabold text-xs shadow-sm"
                  style={{ backgroundImage: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>
                  {initials}
                </div>
                <div className="hidden md:block">
                  <p className="text-[13px] font-semibold text-zinc-900 dark:text-white leading-tight">{user.name ?? "User"}</p>
                  <p className="text-[11px] text-zinc-400 leading-tight truncate max-w-35">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content area */}
        <main
          className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 lg:px-8"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Content wrapper */}
          <div className="max-w-350 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

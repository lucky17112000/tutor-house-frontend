"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  GraduationCap,
  Tag,
  CalendarCheck,
  CalendarDays,
  Search,
  UserCog,
  User,
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  X,
  Shield,
  Star,
  BookMarked,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Mail,
  Clock,
} from "lucide-react";
import { createAuthClient } from "better-auth/client";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface NavChild {
  id: string;
  name: string;
  emoji: string;
}
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  children?: NavChild[];
  section?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: any;
  categories?: { id: string; name: string }[];
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const ICON_MAP: Record<string, string> = {
  math: "➕",
  physics: "⚛️",
  chemistry: "🧪",
  bangla: "অ",
  english: "🔤",
  biology: "🧬",
  ict: "💻",
  programming: "👨‍💻",
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/users": "Manage Users",
  "/dashboard/course": "Manage Tutors",
  "/dashboard/category": "Manage Categories",
  "/dashboard/booking": "Bookings",
  "/dashboard/createBook": "My Bookings",
  "/dashboard/create": "Setup Profile",
  "/dashboard/profile": "My Profile",
  "/dashboard/myreview": "My Reviews",
  "/tutor": "Browse Tutors",
};

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  tutor: {
    label: "Tutor",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    dot: "bg-blue-600",
  },
  student: {
    label: "Student",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
};

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: { credentials: "include" },
});

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getNavItems(role: string, cats: NavChild[]): NavItem[] {
  if (role === "admin")
    return [
      {
        name: "Overview",
        href: "/dashboard",
        icon: <LayoutDashboard className="size-4" />,
        section: "Dashboard",
      },
      {
        name: "Manage Users",
        href: "/dashboard/users",
        icon: <Users2 className="size-4" />,
        section: "Management",
      },
      {
        name: "Manage Tutors",
        href: "/dashboard/course",
        icon: <GraduationCap className="size-4" />,
        section: "Management",
      },
      {
        name: "Manage Categories",
        href: "/dashboard/category",
        icon: <Tag className="size-4" />,
        section: "Management",
      },
      {
        name: "Manage Bookings",
        href: "/dashboard/booking",
        icon: <CalendarCheck className="size-4" />,
        section: "Management",
      },
      {
        name: "My Profile",
        href: "/dashboard/profile",
        icon: <User className="size-4" />,
        section: "Profile",
      },
    ];
  if (role === "tutor")
    return [
      {
        name: "Overview",
        href: "/dashboard",
        icon: <LayoutDashboard className="size-4" />,
        section: "Dashboard",
      },
      {
        name: "Setup Profile",
        href: "/dashboard/create",
        icon: <UserCog className="size-4" />,
        children: cats,
        section: "Teaching",
      },
      {
        name: "My Bookings",
        href: "/dashboard/booking",
        icon: <CalendarDays className="size-4" />,
        section: "Teaching",
      },
      {
        name: "My Reviews",
        href: "/dashboard/myreview",
        icon: <Star className="size-4" />,
        section: "Teaching",
      },
      {
        name: "My Profile",
        href: "/dashboard/profile",
        icon: <User className="size-4" />,
        section: "Profile",
      },
    ];
  if (role === "student")
    return [
      {
        name: "Overview",
        href: "/dashboard",
        icon: <LayoutDashboard className="size-4" />,
        section: "Dashboard",
      },
      {
        name: "Browse Tutors",
        href: "/tutor",
        icon: <Search className="size-4" />,
        section: "Learning",
      },
      {
        name: "My Bookings",
        href: "/dashboard/createBook",
        icon: <CalendarDays className="size-4" />,
        section: "Learning",
      },
      {
        name: "My Tutors",
        href: "/dashboard/mytutor",
        icon: <Users2 className="size-4" />,
        section: "Learning",
      },
      {
        name: "My Profile",
        href: "/dashboard/profile",
        icon: <User className="size-4" />,
        section: "Profile",
      },
    ];
  return [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
      section: "Dashboard",
    },
  ];
}

function RoleBadge({ role }: { role: string }) {
  const cfg =
    ROLE_CONFIG[role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.student;
  const Icon = role === "admin" ? Shield : role === "tutor" ? Star : BookMarked;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide",
        cfg.color,
      )}
    >
      <Icon className="size-3" />
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function DashboardLayout({
  children,
  user,
  categories = [],
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
        <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800" />
          <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
        </div>
      </div>
    );
  }

  const role = (user?.role ?? "").toLowerCase();
  const categoryItems: NavChild[] = (
    categories.length > 0
      ? categories
      : [
          { id: "math", name: "Math" },
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "english", name: "English" },
        ]
  ).map((c) => ({
    id: c.id,
    name: c.name,
    emoji: ICON_MAP[c.name.toLowerCase()] ?? "📖",
  }));

  const navItems = getNavItems(role, categoryItems);
  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;
  const initials = (user?.name ?? user?.email ?? "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  /* ── Sidebar inner ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
        {!collapsed && (
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-extrabold text-[18px] tracking-[-0.03em]"
          >
            <span className="w-7 h-7 bg-blue-700 rounded-lg grid place-items-center text-white font-black text-sm shrink-0 transition-transform duration-300 group-hover:-rotate-12">
              T
            </span>
            <span className="text-zinc-900 dark:text-white">tutorhouse</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-white transition-colors ml-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <RoleBadge role={role} />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item, index) => {
          const showSection =
            !collapsed &&
            item.section &&
            (index === 0 || navItems[index - 1]?.section !== item.section);
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isOpen = openDrop === item.name;

          if (item.children) {
            return (
              <div key={item.name}>
                {showSection && (
                  <div className="px-3 pt-3 pb-1 text-[11px] font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => setOpenDrop(isOpen ? null : item.name)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-blue-700 dark:bg-blue-400" />
                  )}
                  <span
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-zinc-400 group-hover:text-zinc-600",
                    )}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {isOpen ? (
                        <ChevronDown className="size-3.5 opacity-60" />
                      ) : (
                        <ChevronRight className="size-3.5 opacity-60" />
                      )}
                    </>
                  )}
                </button>
                {isOpen && !collapsed && (
                  <ul className="mt-1 ml-3 pl-3 border-l border-zinc-100 dark:border-zinc-800 space-y-0.5">
                    {item.children.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`${item.href}?categoryId=${cat.id}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                        >
                          <span>{cat.emoji}</span>
                          <span>{cat.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          return (
            <div key={item.name}>
              {showSection && (
                <div className="px-3 pt-3 pb-1 text-[11px] font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  {item.section}
                </div>
              )}
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-blue-700 dark:bg-blue-400" />
                )}
                <span
                  className={cn(
                    "shrink-0 transition-colors",
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-zinc-400 group-hover:text-zinc-600",
                  )}
                >
                  {item.icon}
                </span>
                {!collapsed && <span className="flex-1">{item.name}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto bg-blue-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Profile card */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 p-3 space-y-2 shrink-0">
        {user && !collapsed && (
          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
            {/* Avatar + name row */}
            <div className="flex items-center gap-3 mb-2.5">
              <div
                className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-sm"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate leading-tight">
                  {user.name ?? "User"}
                </p>
                <RoleBadge role={role} />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                <Mail className="size-3 shrink-0" />
                <span className="text-[11px] truncate">{user.email}</span>
              </div>
              {joinedDate && (
                <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                  <Clock className="size-3 shrink-0" />
                  <span className="text-[11px]">Member since {joinedDate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {user && collapsed && (
          <div
            className="w-9 h-9 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xs shadow-sm"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}
          >
            {initials}
          </div>
        )}

        {/* Back to home */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white transition-colors",
            collapsed && "justify-center",
          )}
        >
          <Home className="size-4 shrink-0" />
          {!collapsed && <span>Back to home</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden",
          collapsed ? "w-18" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar overlay ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 z-40 w-72 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 lg:hidden overflow-y-auto">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4 px-6 shrink-0">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

          {/* Page title */}
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              {pageTitle}
            </h1>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-white transition-colors">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
            </button>

            {/* User chip */}
            {user && (
              <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-zinc-100 dark:border-zinc-800">
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                  }}
                >
                  {initials}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight">
                    {user.name ?? "User"}
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

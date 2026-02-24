"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  Mail,
  Router,
} from "lucide-react";
// import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/client";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: any;
  categories?: { id: string; name: string }[];
}

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});

export default function DashboardLayout({
  children,
  user,
  categories = [],
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch — render a minimal shell on the server
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Icon map for known category names
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

  // Fallback static categories if API returns nothing
  const FALLBACK_CATEGORIES = [
    { id: "math", name: "Math" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "bangla", name: "Bangla" },
    { id: "english", name: "English" },
    { id: "biology", name: "Biology" },
    { id: "ict", name: "ICT" },
  ];

  const resolvedCategories =
    categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const CATEGORY_ITEMS = resolvedCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: ICON_MAP[cat.name.toLowerCase()] ?? "📖",
  }));

  const TUTOR_ITEMS = [
    { name: "Home", href: "/", icon: "📊" },
    {
      name: "Create Course",
      href: "/dashboard/create",
      icon: "📚",
      children: CATEGORY_ITEMS,
    },
    { name: "My Bookings", href: "/dashboard/booking", icon: "📅" },
  ];
  const STUDENT_ITEMS = [
    { name: "Home", href: "/", icon: "📊" },
    { name: "Show Bookings", href: "/dashboard/createBook", icon: "📚" },
  ];
  const ADMIN_ITEMS = [
    { name: "Home", href: "/", icon: "📊" },
    { name: "Manage Users", href: "/dashboard/users", icon: "👥" },
    { name: "Manage Tutor", href: "/dashboard/course", icon: "📚" },
    { name: "Manage Categories", href: "/dashboard/category", icon: "📂" },
    { name: "Manage Booking", href: "/dashboard/booking", icon: "📚" },
  ];

  // ✅ Conditionally set navItems based on user role
  const role = user?.role;
  let navItems = [];

  if (role === "Tutor") {
    navItems = TUTOR_ITEMS;
  } else if (role === "Student") {
    navItems = STUDENT_ITEMS;
  } else if (role === "Admin") {
    navItems = ADMIN_ITEMS;
  } else {
    // Default items if no role
    navItems = [{ name: "Home", href: "/", icon: "📊" }];
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              TutorHub
            </h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item: any) => (
              <li key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name,
                        )
                      }
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-xl">{item.icon}</span>
                      {isSidebarOpen && (
                        <>
                          <span className="font-medium flex-1 text-left">
                            {item.name}
                          </span>
                          {openDropdown === item.name ? (
                            <ChevronDown className="size-4 opacity-50" />
                          ) : (
                            <ChevronRight className="size-4 opacity-50" />
                          )}
                        </>
                      )}
                    </button>
                    {openDropdown === item.name && isSidebarOpen && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.children.map(
                          (cat: { id: string; name: string; icon: string }) => (
                            <li key={cat.name}>
                              <Link
                                href={`${item.href}?categoryId=${cat.id}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                              >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isSidebarOpen && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto flex flex-col gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
          {/* User Info Card */}
          {user ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <div className="w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                    {user.name || "User Account"}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-indigo-500 dark:text-indigo-400 truncate">
                    <Mail className="size-3 shrink-0" />
                    {user.email || "user@example.com"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
                ?
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Guest
                  </p>
                  <p className="text-xs text-gray-400">Please login</p>
                </div>
              )}
            </div>
          )}

          {/* Back to Home */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className={`gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950 transition-all ${
              isSidebarOpen ? "w-full justify-start" : "w-full justify-center"
            }`}
          >
            <Link href="/">
              <Home className="size-4 shrink-0" />
              {isSidebarOpen && <span>Back to Home</span>}
            </Link>
          </Button>

          {/* Logout */}
          <Button
            variant="destructive"
            size="sm"
            className={`gap-2 transition-all ${
              isSidebarOpen ? "w-full justify-start" : "w-full justify-center"
            }`}
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/login";
                  },
                },
              });
            }}
          >
            <LogOut className="size-4 shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>

          {/* User info in header (optional) */}
          {user && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user.name}
              </span>
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

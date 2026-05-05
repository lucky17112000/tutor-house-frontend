import { getSession } from "@/service/auth";
import { getStudentBookings } from "@/service/booking";
import {
  BookMarked,
  Mail,
  Clock,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Search,
  XCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function InfoRow({
  icon, label, value, valueClass = "text-zinc-900 dark:text-zinc-100",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl px-4 py-3">
      <span className="shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.04em]">{label}</p>
        <p className={`text-sm font-semibold truncate ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}

export default async function StudentProfile() {
  const [sessionRes, bookingsRes] = await Promise.all([
    getSession(),
    getStudentBookings(),
  ]);

  const user: any = sessionRes?.data?.user ?? sessionRes?.data ?? {};

  const bookings: any[] = Array.isArray(bookingsRes)
    ? bookingsRes
    : (bookingsRes?.bookings ?? bookingsRes?.data ?? []);

  const upcoming  = bookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s: number, b: any) => s + (Number(b.price) || 0), 0);

  const name     = user?.name ?? "Student";
  const email    = user?.email ?? "—";
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const joined   = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  /* Recent completed sessions */
  const recentSessions = bookings
    .filter((b) => b.status === "COMPLETED")
    .slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Hero card ── */}
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        {/* Banner */}
        <div
          className="h-28"
          style={{ background: "linear-gradient(135deg,#059669 0%,#0d9488 50%,#0ea5e9 100%)" }}
        />

        <div className="px-7 pb-7">
          {/* Avatar row */}
          <div className="flex items-start gap-5 mb-5">
            <div
              className="-mt-10 w-20 h-20 rounded-2xl border-4 border-white dark:border-zinc-900 grid place-items-center text-white font-black text-2xl shadow-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#059669,#0ea5e9)" }}
            >
              {initials}
            </div>
            <div className="pt-2 min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 mb-1">
                <BookMarked className="size-3" /> Student
              </span>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight truncate">
                {name}
              </h1>
              <p className="text-sm text-zinc-400 truncate">{email}</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid sm:grid-cols-2 gap-2.5">
            <InfoRow icon={<Mail className="size-4 text-zinc-400" />}            label="Email"          value={email} />
            <InfoRow icon={<Clock className="size-4 text-zinc-400" />}           label="Member since"   value={joined} />
            <InfoRow
              icon={<CheckCircle2 className="size-4 text-emerald-500" />}
              label="Account status"
              value="Active"
              valueClass="text-emerald-600 dark:text-emerald-400 font-semibold"
            />
            <InfoRow
              icon={<DollarSign className="size-4 text-indigo-500" />}
              label="Total spent"
              value={`$${totalSpent}`}
              valueClass="text-indigo-600 dark:text-indigo-400 font-bold"
            />
          </div>
        </div>
      </div>

      {/* ── Learning stats ── */}
      <div>
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em] mb-3">
          My learning journey
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <CalendarDays className="size-4" />,  label: "All sessions", value: bookings.length, bg: "bg-zinc-50 dark:bg-zinc-800",               num: "text-zinc-900 dark:text-white"            },
            { icon: <TrendingUp className="size-4" />,    label: "Upcoming",     value: upcoming,        bg: "bg-blue-50 dark:bg-blue-950/20",             num: "text-blue-700 dark:text-blue-400"         },
            { icon: <CheckCircle2 className="size-4" />,  label: "Completed",    value: completed,       bg: "bg-emerald-50 dark:bg-emerald-950/20",       num: "text-emerald-700 dark:text-emerald-400"   },
            { icon: <XCircle className="size-4" />,       label: "Cancelled",    value: cancelled,       bg: "bg-red-50 dark:bg-red-950/20",               num: "text-red-600 dark:text-red-400"           },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 ${s.bg}`}>
              <div className={`mb-2 opacity-60 ${s.num}`}>{s.icon}</div>
              <div className={`text-2xl font-extrabold tracking-tight ${s.num}`}>{s.value}</div>
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent completed sessions ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em]">
            Recent completed sessions
          </h2>
          <Link
            href="/dashboard/createBook"
            className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentSessions.length > 0 ? (
          recentSessions.map((b: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-3.5 border-b border-zinc-50 dark:border-zinc-800 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full shrink-0 grid place-items-center text-white font-bold text-xs shadow-sm"
                style={{ background: "linear-gradient(135deg,#059669,#0ea5e9)" }}
              >
                {(b.tutor?.name ?? b.tutorName ?? "T")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {b.tutor?.name ?? b.tutorName ?? "Tutor"}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {b.bookingDate ?? b.date ?? "—"}
                  {b.startTime ? ` · ${b.startTime}` : ""}
                  {b.endTime   ? ` – ${b.endTime}` : ""}
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                ${b.price ?? 0}
              </span>
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 shrink-0">
                Done
              </span>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <Search className="size-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-zinc-400 mb-3">No completed sessions yet</p>
            <Link
              href="/tutor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Find a tutor →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

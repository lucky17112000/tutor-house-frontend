import { getAllBookings, getAllUsers } from "@/service/admin";
import { getSession } from "@/service/auth";
import {
  Shield,
  Mail,
  Clock,
  Users2,
  CalendarCheck,
  GraduationCap,
  BookMarked,
  CheckCircle2,
  Hash,
} from "lucide-react";

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

export default async function AdminProfile() {
  const [sessionRes, usersRes, bookingsRes] = await Promise.all([
    getSession(),
    getAllUsers(),
    getAllBookings(),
  ]);

  const user: any = sessionRes?.data?.user ?? sessionRes?.data ?? {};

  const users: any[]    = Array.isArray(usersRes) ? usersRes : (usersRes?.data ?? []);
  const bookings: any[] = Array.isArray(bookingsRes)
    ? bookingsRes
    : (bookingsRes?.bookings ?? bookingsRes?.data ?? []);

  const totalTutors   = users.filter((u) => u.role?.toLowerCase() === "tutor").length;
  const totalStudents = users.filter((u) => u.role?.toLowerCase() === "student").length;
  const completed     = bookings.filter((b) => b.status === "COMPLETED").length;
  const pending       = bookings.filter((b) => b.status === "PENDING").length;

  const name     = user?.name ?? "Admin";
  const email    = user?.email ?? "—";
  const userId   = user?.id ?? "—";
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const joined   = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Hero card ── */}
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        {/* Banner */}
        <div
          className="h-28"
          style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1d4ed8 55%,#3b82f6 100%)" }}
        />

        <div className="px-7 pb-7">
          {/* Avatar row */}
          <div className="flex items-end gap-5 -mt-10 mb-5">
            <div
              className="w-20 h-20 rounded-2xl border-4 border-white dark:border-zinc-900 grid place-items-center text-white font-black text-2xl shadow-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#0a0a0a,#1d4ed8)" }}
            >
              {initials}
            </div>
            <div className="pb-1 min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 mb-1">
                <Shield className="size-3" /> Admin
              </span>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight truncate">
                {name}
              </h1>
              <p className="text-sm text-zinc-400 truncate">{email}</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid sm:grid-cols-2 gap-2.5">
            <InfoRow icon={<Mail className="size-4 text-zinc-400" />}        label="Email"          value={email} />
            <InfoRow icon={<Clock className="size-4 text-zinc-400" />}       label="Member since"   value={joined} />
            <InfoRow
              icon={<CheckCircle2 className="size-4 text-emerald-500" />}
              label="Account status"
              value="Active"
              valueClass="text-emerald-600 dark:text-emerald-400 font-semibold"
            />
            <InfoRow icon={<Hash className="size-4 text-zinc-400" />}        label="User ID"        value={String(userId).slice(0, 16) + "…"} />
          </div>
        </div>
      </div>

      {/* ── Platform summary ── */}
      <div>
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em] mb-3">
          Platform overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Users2 className="size-4" />,        label: "Total users",  value: users.length,  bg: "bg-zinc-50 dark:bg-zinc-800",               num: "text-zinc-900 dark:text-white"            },
            { icon: <GraduationCap className="size-4" />, label: "Tutors",       value: totalTutors,   bg: "bg-blue-50 dark:bg-blue-950/20",             num: "text-blue-700 dark:text-blue-400"         },
            { icon: <BookMarked className="size-4" />,    label: "Students",     value: totalStudents, bg: "bg-emerald-50 dark:bg-emerald-950/20",       num: "text-emerald-700 dark:text-emerald-400"   },
            { icon: <CalendarCheck className="size-4" />, label: "Sessions done",value: completed,     bg: "bg-indigo-50 dark:bg-indigo-950/20",         num: "text-indigo-700 dark:text-indigo-400"     },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 ${s.bg}`}
            >
              <div className={`mb-2 opacity-60 ${s.num}`}>{s.icon}</div>
              <div className={`text-2xl font-extrabold tracking-tight ${s.num}`}>{s.value}</div>
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking health ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6">
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em] mb-4">
          Booking health
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total",     value: bookings.length, color: "text-zinc-900 dark:text-white"           },
            { label: "Completed", value: completed,        color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Pending",   value: pending,          color: "text-amber-600 dark:text-amber-400"     },
          ].map((item) => (
            <div key={item.label} className="text-center py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
              <div className={`text-3xl font-extrabold tracking-tight ${item.color}`}>{item.value}</div>
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

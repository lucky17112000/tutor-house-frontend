"use client";

import { deleteTutorProfileSt } from "@/actions/signin.actions";
import { getAllBookings, getAllUsers } from "@/service/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap,
  Search,
  RefreshCw,
  Loader2,
  CalendarCheck,
  DollarSign,
  UserCheck,
  UserX,
  ShieldAlert,
} from "lucide-react";

export const dynamic = "force-dynamic";

/* ── per-tutor row shape ── */
interface TutorRow {
  id: string;
  name: string;
  email: string;
  banned: boolean;
  createdAt?: string;
  sessions: number;
  completed: number;
  earnings: number;
}

export default function ManageTutors() {
  const [tutors, setTutors]         = useState<TutorRow[]>([]);
  const [loading, setLoading]       = useState(true);
  const [query, setQuery]           = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [usersRes, bookingsRes] = await Promise.all([
      getAllUsers(),
      getAllBookings(),
    ]);

    const users: any[]    = Array.isArray(usersRes) ? usersRes : (usersRes?.data ?? usersRes?.users ?? []);
    const bookings: any[] = Array.isArray(bookingsRes) ? bookingsRes : (bookingsRes?.bookings ?? bookingsRes?.data ?? []);

    /* build tutor rows enriched with booking stats */
    const tutorUsers = users.filter((u) => u.role?.toLowerCase() === "tutor");

    const rows: TutorRow[] = tutorUsers.map((u) => {
      const mine      = bookings.filter((b) => b.tutorId === u.id || b.tutor?.id === u.id);
      const completed = mine.filter((b) => b.status === "COMPLETED");
      const earnings  = completed.reduce((s: number, b: any) => s + (Number(b.price) || 0), 0);
      return {
        id:        u.id,
        name:      u.name  ?? "—",
        email:     u.email ?? "—",
        banned:    Boolean(u.banned),
        createdAt: u.createdAt,
        sessions:  mine.length,
        completed: completed.length,
        earnings,
      };
    });

    setTutors(rows);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDeleteProfile = async (tutorId: string, name: string) => {
    if (!confirm(`Delete tutor profile for "${name}"?\nThis removes their tutor data but keeps their account.`)) return;
    setDeletingId(tutorId);
    try {
      const res = await deleteTutorProfileSt(tutorId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Tutor profile for ${name} deleted.`);
        /* refresh to reflect change */
        await load();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = query.trim()
    ? tutors.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.email.toLowerCase().includes(query.toLowerCase()),
      )
    : tutors;

  const totalSessions  = tutors.reduce((s, t) => s + t.sessions,  0);
  const totalEarnings  = tutors.reduce((s, t) => s + t.earnings,  0);
  const activeTutors   = tutors.filter((t) => !t.banned).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Manage Tutors
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            View all tutor profiles and remove them when needed.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-700 disabled:opacity-50 transition-all"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* ── Summary pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total tutors",
            value: tutors.length,
            icon: <GraduationCap className="size-4" />,
            bg:  "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
            num: "text-blue-700 dark:text-blue-400",
          },
          {
            label: "Active tutors",
            value: activeTutors,
            icon: <UserCheck className="size-4" />,
            bg:  "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
            num: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: "Total sessions",
            value: totalSessions,
            icon: <CalendarCheck className="size-4" />,
            bg:  "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
            num: "text-zinc-900 dark:text-white",
          },
          {
            label: "Platform earnings",
            value: `$${totalEarnings.toLocaleString()}`,
            icon: <DollarSign className="size-4" />,
            bg:  "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
            num: "text-amber-700 dark:text-amber-400",
          },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <div className={`mb-1 opacity-60 ${s.num}`}>{s.icon}</div>
            <div className={`text-3xl font-extrabold tracking-tight ${s.num}`}>{s.value}</div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">

        {/* Card header + search */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex-wrap">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-blue-700 dark:text-blue-400" />
            <h2 className="font-bold text-zinc-900 dark:text-white" style={{ fontSize: 15 }}>
              All Tutor Profiles
              <span className="ml-2 text-xs font-semibold text-zinc-400">
                {loading ? "loading…" : `${filtered.length} of ${tutors.length}`}
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 min-w-50">
            <Search className="size-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search name or email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 w-full"
            />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-zinc-50 dark:border-zinc-800 last:border-b-0">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-[shimmer_1.6s_ease-in-out_infinite]" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-36 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
                  <div className="h-2.5 w-52 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
                </div>
                <div className="h-5 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
                <div className="h-5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
                <div className="h-5 w-14 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-[shimmer_1.6s_ease-in-out_infinite]" />
                <div className="h-7 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-[shimmer_1.6s_ease-in-out_infinite]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                  {["Tutor", "Status", "Sessions", "Completed", "Earnings", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.04em] border-b border-zinc-100 dark:border-zinc-800"
                      style={{ fontSize: 11, padding: "11px 20px" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((tutor) => {
                    const isDeleting = deletingId === tutor.id;
                    const initial    = (tutor.name ?? "T")[0].toUpperCase();
                    return (
                      <tr
                        key={tutor.id}
                        className={`border-b border-zinc-50 dark:border-zinc-800/60 last:border-b-0 transition-colors ${
                          isDeleting ? "opacity-40" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                        }`}
                      >
                        {/* Tutor */}
                        <td style={{ padding: "13px 20px" }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl shrink-0 grid place-items-center text-white font-bold shadow-sm"
                              style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", fontSize: 14 }}
                            >
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-900 dark:text-white truncate">
                                {tutor.name}
                              </div>
                              <div className="text-zinc-400 truncate" style={{ fontSize: 12 }}>
                                {tutor.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td style={{ padding: "13px 20px" }}>
                          {tutor.banned ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                              <UserX className="size-3" /> Suspended
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                              <UserCheck className="size-3" /> Active
                            </span>
                          )}
                        </td>

                        {/* Sessions */}
                        <td style={{ padding: "13px 20px" }}>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            {tutor.sessions}
                          </span>
                        </td>

                        {/* Completed */}
                        <td style={{ padding: "13px 20px" }}>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {tutor.completed}
                          </span>
                        </td>

                        {/* Earnings */}
                        <td style={{ padding: "13px 20px" }}>
                          <span className="font-bold text-zinc-900 dark:text-white">
                            ${tutor.earnings.toLocaleString()}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "13px 20px" }}>
                          <button
                            onClick={() => handleDeleteProfile(tutor.id, tutor.name)}
                            disabled={isDeleting || !!deletingId}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/40 border border-orange-100 dark:border-orange-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isDeleting ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              <ShieldAlert className="size-3" />
                            )}
                            {isDeleting ? "Deleting…" : "Delete Profile"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <GraduationCap className="size-8 text-zinc-300 dark:text-zinc-600" />
                        <p className="text-sm font-medium text-zinc-400">
                          {query ? `No tutors match "${query}"` : "No tutor profiles found"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

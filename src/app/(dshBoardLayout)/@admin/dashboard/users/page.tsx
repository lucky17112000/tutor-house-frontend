"use client";

import { deleteUserSt } from "@/actions/signin.actions";
import { getAllUsers } from "@/service/admin";
import ClientPaginationBar from "@/components/shared/pagination/ClientPaginationBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Users2,
  GraduationCap,
  BookMarked,
  UserCheck,
  UserX,
  Trash2,
  Loader2,
  Search,
  RefreshCw,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function UserFind() {
  const [users, setUsers]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [query, setQuery]       = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage]         = useState(1);
  const PER_PAGE = 8;
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    const result = await getAllUsers();
    if (result?.data) setUsers(result.data);
    else if (Array.isArray(result)) setUsers(result);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Delete "${userName}"? This cannot be undone.`)) return;
    setDeletingId(userId);
    try {
      const res = await deleteUserSt(userId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`${userName} deleted.`);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = query.trim()
    ? users.filter(
        (u) =>
          u.name?.toLowerCase().includes(query.toLowerCase()) ||
          u.email?.toLowerCase().includes(query.toLowerCase()) ||
          u.role?.toLowerCase().includes(query.toLowerCase())
      )
    : users;

  // reset to page 1 whenever search changes
  useEffect(() => { setPage(1); }, [query]);

  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalTutors   = users.filter((u) => u.role?.toLowerCase() === "tutor").length;
  const totalStudents = users.filter((u) => u.role?.toLowerCase() === "student").length;
  const suspended     = users.filter((u) => u.banned).length;

  const ROLE_STYLE: Record<string, string> = {
    tutor:   "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    student: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    admin:   "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Manage Users
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            All students, tutors and staff on the platform.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-700 disabled:opacity-50 transition-all"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total users",  value: users.length,   icon: <Users2 className="size-4" />,        bg: "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",               num: "text-zinc-900 dark:text-white" },
          { label: "Tutors",       value: totalTutors,    icon: <GraduationCap className="size-4" />, bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",             num: "text-blue-700 dark:text-blue-400" },
          { label: "Students",     value: totalStudents,  icon: <BookMarked className="size-4" />,    bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900", num: "text-emerald-700 dark:text-emerald-400" },
          { label: "Suspended",    value: suspended,      icon: <UserX className="size-4" />,         bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",                 num: "text-red-600 dark:text-red-400" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <div className={`mb-1 opacity-60 ${s.num}`}>{s.icon}</div>
            <div className={`text-3xl font-extrabold tracking-tight ${s.num}`}>{s.value}</div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">

        {/* Card header + search */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex-wrap">
          <div className="flex items-center gap-2">
            <Users2 className="size-4 text-blue-700 dark:text-blue-400" />
            <h2 className="font-bold text-zinc-900 dark:text-white" style={{ fontSize: 15 }}>
              All Users
              <span className="ml-2 text-xs font-semibold text-zinc-400">
                {loading ? "loading…" : `${filtered.length} of ${users.length}`}
              </span>
            </h2>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 min-w-50">
            <Search className="size-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search name, email, role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 w-full"
            />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-zinc-50 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                  <div className="h-2.5 w-48 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                </div>
                <div className="h-5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                <div className="h-5 w-14 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                  {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
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
                {paged.length > 0 ? (
                  paged.map((user: any) => {
                    const roleKey = (user.role ?? "student").toLowerCase();
                    const roleCls = ROLE_STYLE[roleKey] ?? ROLE_STYLE.student;
                    const initial = (user.name ?? user.email ?? "?")[0].toUpperCase();
                    const joined  = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—";
                    const isDeleting = deletingId === user.id;

                    return (
                      <tr
                        key={user.id}
                        className={`border-b border-zinc-50 dark:border-zinc-800/60 transition-colors last:border-b-0 ${
                          isDeleting ? "opacity-40" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                        }`}
                      >
                        {/* User */}
                        <td style={{ padding: "13px 20px" }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full shrink-0 grid place-items-center text-white font-bold shadow-sm"
                              style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", fontSize: 13 }}
                            >
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-900 dark:text-white truncate">
                                {user.name ?? "—"}
                              </div>
                              <div className="text-zinc-400 truncate" style={{ fontSize: 12 }}>
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td style={{ padding: "13px 20px" }}>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold ${roleCls}`}
                            style={{ fontSize: 11 }}
                          >
                            {roleKey === "tutor" && <GraduationCap className="size-3" />}
                            {roleKey === "student" && <BookMarked className="size-3" />}
                            {user.role ?? "Student"}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: "13px 20px" }}>
                          {user.banned ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                              <UserX className="size-3" /> Suspended
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                              <UserCheck className="size-3" /> Active
                            </span>
                          )}
                        </td>

                        {/* Joined */}
                        <td style={{ padding: "13px 20px" }}>
                          <span className="text-zinc-500 dark:text-zinc-400" style={{ fontSize: 13 }}>
                            {joined}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "13px 20px" }}>
                          <button
                            onClick={() => handleDelete(user.id, user.name ?? user.email)}
                            disabled={isDeleting || !!deletingId}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 border border-red-100 dark:border-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isDeleting ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              <Trash2 className="size-3" />
                            )}
                            {isDeleting ? "Deleting…" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <Users2 className="size-8 text-zinc-300 dark:text-zinc-600" />
                        <p className="text-sm font-medium text-zinc-400">
                          {query ? `No users match "${query}"` : "No users found"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bar */}
        {!loading && (
          <ClientPaginationBar
            total={filtered.length}
            page={page}
            perPage={PER_PAGE}
            onPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

import { getAllBookings } from "@/service/admin";
import AdminCancelAllButton from "@/components/booking/AdminCancelAllButton";
import AdminDeleteBookingButton from "@/components/booking/AdminDeleteBookingButton";
import {
  CalendarDays, Clock, DollarSign, GraduationCap,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PER_PAGE = 4;

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING:   { bg: "bg-amber-50 dark:bg-amber-950/30",   text: "text-amber-700 dark:text-amber-400",   dot: "bg-amber-500"   },
  CONFIRMED: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  CANCELLED: { bg: "bg-red-50 dark:bg-red-950/30",       text: "text-red-600 dark:text-red-400",       dot: "bg-red-500"     },
  COMPLETED: { bg: "bg-blue-50 dark:bg-blue-950/30",     text: "text-blue-700 dark:text-blue-400",     dot: "bg-blue-500"    },
};

const AdminBookingManage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const result = await getAllBookings();

  if (!result || result.error) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-red-500 font-semibold">
          {result?.error || "Booking data not found."}
        </p>
      </div>
    );
  }

  const allBookings: any[] = Array.isArray(result) ? result : (result?.data ?? []);
  const totalPages = Math.ceil(allBookings.length / PER_PAGE);
  const safePage   = Math.min(currentPage, Math.max(1, totalPages));
  const bookings   = allBookings.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const cancelledIds = allBookings
    .filter((b: any) => (b.status ?? "").toUpperCase() === "CANCELLED")
    .map((b: any) => b.id);

  /* summary counts */
  const counts = {
    PENDING:   allBookings.filter((b) => (b.status ?? "").toUpperCase() === "PENDING").length,
    CONFIRMED: allBookings.filter((b) => (b.status ?? "").toUpperCase() === "CONFIRMED").length,
    COMPLETED: allBookings.filter((b) => (b.status ?? "").toUpperCase() === "COMPLETED").length,
    CANCELLED: allBookings.filter((b) => (b.status ?? "").toUpperCase() === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Manage Bookings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            All sessions across the platform — {allBookings.length} total.
          </p>
        </div>
        {cancelledIds.length > 0 && (
          <AdminCancelAllButton bookingIds={cancelledIds} />
        )}
      </div>

      {/* ── Summary pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["PENDING","CONFIRMED","COMPLETED","CANCELLED"] as const).map((s) => {
          const st = STATUS_STYLE[s];
          return (
            <div key={s} className={`rounded-2xl border p-4 ${st.bg} border-current/10`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full shrink-0 ${st.dot}`} />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${st.text}`}>{s}</span>
              </div>
              <div className={`text-3xl font-extrabold tracking-tight ${st.text}`}>{counts[s]}</div>
            </div>
          );
        })}
      </div>

      {/* ── Booking cards ── */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <CalendarDays className="size-10 text-zinc-300 dark:text-zinc-600 mb-3" />
          <p className="font-semibold text-zinc-600 dark:text-zinc-400">No bookings on this page</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((booking: any) => {
            const studentName = booking.student?.name ?? booking.user?.name ?? "Unknown Student";
            const tutorName   = booking.tutor?.name ?? "Unknown Tutor";
            const status      = (booking.status ?? "PENDING").toUpperCase();
            const st          = STATUS_STYLE[status] ?? STATUS_STYLE.PENDING;

            return (
              <div
                key={booking.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-shadow duration-300"
              >
                {/* Card header */}
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl shrink-0 grid place-items-center text-white font-bold text-sm"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>
                      {studentName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-zinc-900 dark:text-white truncate">{studentName}</p>
                      <p className="text-[11px] text-zinc-400">Student</p>
                    </div>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.bg} ${st.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {status}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-5 py-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-1.5 text-zinc-400"><GraduationCap className="size-3.5" />Tutor</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{tutorName}</span>
                  </div>
                  {booking.sessionDate && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-1.5 text-zinc-400"><CalendarDays className="size-3.5" />Date</span>
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        {new Date(booking.sessionDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-1.5 text-zinc-400"><Clock className="size-3.5" />Time</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {new Date(booking.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      {" – "}
                      {new Date(booking.endTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="h-px bg-zinc-50 dark:bg-zinc-800" />
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-1.5 text-zinc-400"><DollarSign className="size-3.5" />Price</span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-[15px]">৳{booking.price}</span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 pb-4 pt-1">
                  <AdminDeleteBookingButton bookingId={booking.id} studentName={studentName} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 tabular-nums">
            Showing{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, allBookings.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{allBookings.length}</span> bookings
          </p>

          <div className="flex items-center gap-1">
            {/* Prev */}
            <Link
              href={`?page=${safePage - 1}`}
              aria-disabled={safePage === 1}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                safePage === 1
                  ? "pointer-events-none opacity-35 text-zinc-400"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <ChevronLeft className="size-4" />
            </Link>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`?page=${p}`}
                className={`w-8 h-8 rounded-lg text-[13px] font-semibold flex items-center justify-center transition-all duration-150 ${
                  p === safePage
                    ? "bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {p}
              </Link>
            ))}

            {/* Next */}
            <Link
              href={`?page=${safePage + 1}`}
              aria-disabled={safePage === totalPages}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                safePage === totalPages
                  ? "pointer-events-none opacity-35 text-zinc-400"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBookingManage;

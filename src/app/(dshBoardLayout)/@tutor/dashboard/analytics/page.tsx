import DashBarChart from "@/components/dashboard/charts/DashBarChart";
import DashDonutChart from "@/components/dashboard/charts/DashDonutChart";
import DashProgressList from "@/components/dashboard/charts/DashProgressList";
import DashStatCard from "@/components/dashboard/stats/DashStatCard";
import { getTutorBookings } from "@/service/tutor/user.services";

export const dynamic = "force-dynamic";

const WEEKLY_SESSIONS = [
  { label: "W1", value: 6 },
  { label: "W2", value: 8 },
  { label: "W3", value: 7 },
  { label: "W4", value: 11 },
  { label: "W5", value: 9 },
  { label: "W6", value: 13 },
  { label: "W7", value: 10 },
  { label: "W8", value: 12 },
];

export default async function TutorAnalyticsPage() {
  const res = await getTutorBookings();

  const bookings: any[] = Array.isArray(res)
    ? res
    : (res?.bookings ?? res?.data ?? []);

  const upcoming = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "CONFIRMED"
  ).length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const earnings = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s, b) => s + (Number(b.price) || 0), 0);

  const totalSessions = bookings.length;
  const recentBookings = bookings.slice(0, 5);

  const STATUS: Record<string, string> = {
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PENDING: "bg-amber-100 text-amber-700",
    CANCELLED: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-5">
      {/* Page title */}
      <div className="pb-1">
        <h1
          className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em]"
          style={{ fontSize: 28 }}
        >
          Welcome back 👋
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Here&apos;s your teaching overview. Keep up the great work!
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <DashStatCard
          icon="📅"
          label="Sessions this week"
          value={12}
          delta={8}
          colorIndex={1}
          spark={[4, 6, 5, 8, 7, 9, 12]}
        />
        <DashStatCard
          icon="👥"
          label="Active students"
          value={upcoming || 38}
          delta={12}
          colorIndex={2}
          spark={[22, 25, 28, 30, 33, 35, upcoming || 38]}
        />
        <DashStatCard
          icon="💰"
          label="Earnings this month"
          value={earnings || 2840}
          prefix="$"
          delta={18}
          colorIndex={3}
          spark={[1200, 1450, 1800, 2100, 2400, 2640, earnings || 2840]}
        />
        <DashStatCard
          icon="⭐"
          label="Avg. rating"
          value={4.92}
          delta={2}
          colorIndex={4}
          spark={[4.7, 4.75, 4.8, 4.85, 4.88, 4.9, 4.92]}
        />
      </div>

      {/* ── Charts row ── */}
      <div
        className="grid gap-3.5 max-lg:grid-cols-1"
        style={{ gridTemplateColumns: "1.55fr 1fr" }}
      >
        <DashBarChart
          title="Sessions over the past 8 weeks"
          sub="Booking momentum week over week."
          data={WEEKLY_SESSIONS}
          footer="Trending up — you've added 4 sessions/week on average since W1."
        />
        <DashDonutChart
          title="Subjects taught"
          sub="Where your hours go this month."
          segments={[
            { label: "Calculus", value: 18, color: "#1d4ed8" },
            { label: "Algebra", value: 12, color: "#2563eb" },
            { label: "SAT Prep", value: 8, color: "#0a0a0a" },
            { label: "Geometry", value: 4, color: "#a1a1aa" },
          ]}
        />
      </div>

      {/* ── Monthly goals ── */}
      <DashProgressList
        title="Monthly goals"
        sub="Track your hours, earnings, response rate, and student retention."
        items={[
          {
            label: "Hours taught",
            value: completed * 1 || 42,
            max: 60,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
          {
            label: "Earnings target ($)",
            value: earnings || 2840,
            max: 4000,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
          {
            label: "Response rate",
            value: 94,
            max: 100,
            accent: "linear-gradient(90deg,#0a0a0a,#18181b)",
          },
          {
            label: "Student retention",
            value: 81,
            max: 100,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
        ]}
      />

      {/* ── Session summary pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          {
            label: "Total sessions",
            value: totalSessions,
            bg: "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
            num: "text-zinc-900 dark:text-white",
          },
          {
            label: "Upcoming",
            value: upcoming,
            bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
            num: "text-blue-700 dark:text-blue-400",
          },
          {
            label: "Completed",
            value: completed,
            bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
            num: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: "Cancelled",
            value: cancelled,
            bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",
            num: "text-red-600 dark:text-red-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border p-5 ${item.bg}`}
          >
            <div
              className={`font-extrabold tracking-[-0.03em] mb-1 ${item.num}`}
              style={{ fontSize: 36 }}
            >
              {item.value}
            </div>
            <div
              className="font-semibold text-zinc-500 uppercase tracking-[0.04em]"
              style={{ fontSize: 11 }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Upcoming bookings list ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex justify-between items-center px-5.5 py-4.5 border-b border-zinc-100 dark:border-zinc-800">
          <h3
            className="font-bold text-zinc-900 dark:text-white"
            style={{ fontSize: 16 }}
          >
            Upcoming bookings
          </h3>
          <a
            href="/dashboard/booking"
            className="text-blue-700 dark:text-blue-400 font-semibold hover:underline"
            style={{ fontSize: 13 }}
          >
            View all →
          </a>
        </div>

        <div>
          {recentBookings.length > 0 ? (
            recentBookings.map((b: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5.5 py-3.5 border-b border-zinc-50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors last:border-b-0"
              >
                {/* Avatar */}
                <div
                  className="grid place-items-center text-white font-bold rounded-xl shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                    fontSize: 16,
                  }}
                >
                  {(b.student?.name ?? b.studentName ?? "S")[0].toUpperCase()}
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-zinc-900 dark:text-white text-sm truncate">
                    {b.student?.name ?? b.studentName ?? "Student"}
                  </div>
                  <div className="text-zinc-400 text-xs mt-0.5">
                    {b.bookingDate ?? b.date ?? "—"} · {b.startTime ?? ""}
                    {b.endTime ? ` – ${b.endTime}` : ""}
                  </div>
                </div>

                {/* Price */}
                <div
                  className="font-bold text-blue-700 dark:text-blue-400 shrink-0"
                  style={{ fontSize: 14 }}
                >
                  ${b.price ?? 0}
                </div>

                {/* Status */}
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                    STATUS[b.status] ?? "bg-zinc-100 text-zinc-600"
                  }`}
                  style={{ fontSize: 11 }}
                >
                  {b.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-400 py-10 text-sm">
              No bookings yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

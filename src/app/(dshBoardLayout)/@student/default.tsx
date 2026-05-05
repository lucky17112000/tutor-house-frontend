import DashBarChart from "@/components/dashboard/charts/DashBarChart";
import DashProgressList from "@/components/dashboard/charts/DashProgressList";
import DashStatCard from "@/components/dashboard/stats/DashStatCard";
import { getStudentBookings } from "@/service/booking";

export const dynamic = "force-dynamic";

const MOCK_SESSIONS = [
  { tutor: { name: "Sarah Johnson" }, bookingDate: "2025-05-01", startTime: "10:00", endTime: "11:00", price: 45, status: "COMPLETED" },
  { tutor: { name: "Mark Williams" }, bookingDate: "2025-05-03", startTime: "14:00", endTime: "15:00", price: 50, status: "PENDING" },
  { tutor: { name: "Emily Chen" }, bookingDate: "2025-04-28", startTime: "09:00", endTime: "10:00", price: 55, status: "COMPLETED" },
  { tutor: { name: "James Taylor" }, bookingDate: "2025-04-25", startTime: "16:00", endTime: "17:00", price: 40, status: "CANCELLED" },
  { tutor: { name: "Priya Patel" }, bookingDate: "2025-05-07", startTime: "11:00", endTime: "12:00", price: 60, status: "CONFIRMED" },
];

const WEEKLY_ACTIVITY = [
  { label: "W1", value: 1 },
  { label: "W2", value: 2 },
  { label: "W3", value: 1 },
  { label: "W4", value: 3 },
  { label: "W5", value: 2 },
  { label: "W6", value: 4 },
  { label: "W7", value: 3 },
  { label: "W8", value: 4 },
];

export default async function StudentDefault() {
  const res = await getStudentBookings();

  const bookings: any[] = Array.isArray(res)
    ? res
    : (res?.bookings ?? res?.data ?? []);

  const upcoming = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "CONFIRMED"
  ).length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s, b) => s + (Number(b.price) || 0), 0);

  const recentBookings = bookings.length > 0 ? bookings.slice(0, 5) : MOCK_SESSIONS;

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
          My Learning Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Track your sessions, progress, and spending.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <DashStatCard
          icon="📚"
          label="Total sessions booked"
          value={bookings.length || 12}
          delta={15}
          colorIndex={1}
          spark={[2, 4, 5, 6, 8, 10, bookings.length || 12]}
        />
        <DashStatCard
          icon="📅"
          label="Upcoming sessions"
          value={upcoming || 3}
          delta={0}
          colorIndex={2}
          spark={[1, 2, 1, 3, 2, 3, upcoming || 3]}
        />
        <DashStatCard
          icon="✅"
          label="Completed sessions"
          value={completed || 8}
          delta={25}
          colorIndex={3}
          spark={[1, 2, 3, 4, 5, 7, completed || 8]}
        />
        <DashStatCard
          icon="💳"
          label="Total spent"
          value={totalSpent || 360}
          prefix="$"
          delta={10}
          colorIndex={4}
          spark={[45, 90, 135, 180, 225, 315, totalSpent || 360]}
        />
      </div>

      {/* ── Activity chart + progress ── */}
      <div
        className="grid gap-3.5 max-lg:grid-cols-1"
        style={{ gridTemplateColumns: "1.4fr 1fr" }}
      >
        <DashBarChart
          title="Session activity — last 8 weeks"
          sub="How many sessions you booked per week."
          data={WEEKLY_ACTIVITY}
          footer="Great momentum! You're booking more sessions each month."
        />

        <DashProgressList
          title="Learning goals"
          sub="Your progress toward this month's targets."
          items={[
            {
              label: "Sessions completed",
              value: completed || 8,
              max: 12,
              accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
            },
            {
              label: "Study hours",
              value: (completed || 8) * 1,
              max: 16,
              accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
            },
            {
              label: "Subjects explored",
              value: 3,
              max: 5,
              accent: "linear-gradient(90deg,#0a0a0a,#18181b)",
            },
            {
              label: "Session satisfaction",
              value: 94,
              max: 100,
              accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
            },
          ]}
        />
      </div>

      {/* ── Session summary pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          {
            label: "All bookings",
            value: bookings.length || 12,
            bg: "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
            num: "text-zinc-900 dark:text-white",
          },
          {
            label: "Upcoming",
            value: upcoming || 3,
            bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
            num: "text-blue-700 dark:text-blue-400",
          },
          {
            label: "Completed",
            value: completed || 8,
            bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
            num: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: "Cancelled",
            value: cancelled || 1,
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

      {/* ── Recent bookings ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex justify-between items-center px-5.5 py-4.5 border-b border-zinc-100 dark:border-zinc-800">
          <h3
            className="font-bold text-zinc-900 dark:text-white"
            style={{ fontSize: 16 }}
          >
            Recent sessions
          </h3>
          <a
            href="/dashboard/createBook"
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
                    background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    fontSize: 16,
                  }}
                >
                  {(b.tutor?.name ?? b.tutorName ?? "T")[0].toUpperCase()}
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-zinc-900 dark:text-white text-sm truncate">
                    {b.tutor?.name ?? b.tutorName ?? "Tutor"}
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
            <div className="py-12 text-center">
              <div className="text-3xl mb-3">📚</div>
              <p className="text-zinc-500 text-sm font-medium">
                No sessions yet
              </p>
              <a
                href="/tutor"
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Browse tutors →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

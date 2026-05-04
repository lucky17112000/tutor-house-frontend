import DashBarChart from "@/components/dashboard/charts/DashBarChart";
import DashDonutChart from "@/components/dashboard/charts/DashDonutChart";
import DashProgressList from "@/components/dashboard/charts/DashProgressList";
import DashStatCard from "@/components/dashboard/stats/DashStatCard";
import { getAllBookings, getAllUsers } from "@/service/admin";

export const dynamic = "force-dynamic";

const MONTHLY_SESSIONS = [
  { label: "Apr", value: 2840 },
  { label: "May", value: 3120 },
  { label: "Jun", value: 3450 },
  { label: "Jul", value: 3210 },
  { label: "Aug", value: 3890 },
  { label: "Sep", value: 4360 },
  { label: "Oct", value: 4720 },
  { label: "Nov", value: 5180 },
];

export default async function AdminDefault() {
  const [usersRes, bookingsRes] = await Promise.all([
    getAllUsers(),
    getAllBookings(),
  ]);

  const users: any[] = Array.isArray(usersRes)
    ? usersRes
    : (usersRes?.users ?? usersRes?.data ?? []);

  const bookings: any[] = Array.isArray(bookingsRes)
    ? bookingsRes
    : (bookingsRes?.bookings ?? bookingsRes?.data ?? []);

  const tutors = users.filter((u) => u.role?.toLowerCase() === "tutor").length;
  const students = users.filter(
    (u) => u.role?.toLowerCase() === "student",
  ).length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const revenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s, b) => s + (Number(b.price) || 0), 0);

  const recentUsers = users.slice(0, 6);

  return (
    <div className="space-y-5">
      {/* Page title */}
      <div className="pb-1">
        <h1
          className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em]"
          style={{ fontSize: 28 }}
        >
          Post-mortem and Autopsy of our platform&apos;s.
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Platform health at a glance.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <DashStatCard
          icon="👥"
          label="Total students"
          value={students || 15420}
          delta={14}
          colorIndex={1}
          spark={[9000, 10500, 11800, 12500, 13400, 14600, students || 15420]}
        />
        <DashStatCard
          icon="🎓"
          label="Active tutors"
          value={tutors || 512}
          delta={6}
          colorIndex={2}
          spark={[410, 430, 455, 470, 485, 500, tutors || 512]}
        />
        <DashStatCard
          icon="📅"
          label="Sessions completed"
          value={completed || 38210}
          delta={9}
          colorIndex={3}
          spark={[22000, 26500, 29000, 31200, 33800, 36200, completed || 38210]}
        />
        <DashStatCard
          icon="💰"
          label="Revenue this quarter"
          value={revenue || 1200000}
          prefix="$"
          delta={22}
          colorIndex={4}
          spark={[
            620000,
            720000,
            830000,
            940000,
            1050000,
            1130000,
            revenue || 1200000,
          ]}
        />
      </div>

      {/* ── Charts row ── */}
      <div
        className="grid gap-3.5 max-lg:grid-cols-1"
        style={{ gridTemplateColumns: "1.55fr 1fr" }}
      >
        <DashBarChart
          title="Sessions completed — last 8 months"
          sub="Monthly throughput across the platform."
          data={MONTHLY_SESSIONS}
          footer="Q4 is on pace to set a new platform record — projected 15,200 sessions."
        />
        <DashDonutChart
          title="Sessions by category"
          sub="Where students are booking most."
          segments={[
            { label: "Mathematics", value: 4280, color: "#1d4ed8" },
            { label: "Sciences", value: 2940, color: "#2563eb" },
            { label: "Languages", value: 2110, color: "#0a0a0a" },
            { label: "Test Prep", value: 1860, color: "#52525b" },
            { label: "Music", value: 740, color: "#a1a1aa" },
          ]}
        />
      </div>

      {/* ── OKR Progress ── */}
      <DashProgressList
        title="Quarterly OKRs"
        sub="Tracking against Q4 platform targets."
        items={[
          {
            label: "New student signups",
            value: students || 4280,
            max: 5000,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
          {
            label: "GMV target ($)",
            value: revenue || 1200000,
            max: 1500000,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
          {
            label: "Tutor approval SLA",
            value: 87,
            max: 100,
            accent: "linear-gradient(90deg,#0a0a0a,#18181b)",
          },
          {
            label: "CSAT score",
            value: 92,
            max: 100,
            accent: "linear-gradient(90deg,#1d4ed8,#2563eb)",
          },
        ]}
      />

      {/* ── Booking summary pills ── */}
      <div className="grid grid-cols-3 gap-3.5">
        {[
          {
            label: "Pending bookings",
            value: pending,
            bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
            num: "text-amber-700 dark:text-amber-400",
          },
          {
            label: "Completed sessions",
            value: completed,
            bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
            num: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: "Total bookings",
            value: bookings.length,
            bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
            num: "text-blue-700 dark:text-blue-400",
          },
        ].map((item) => (
          <div key={item.label} className={`rounded-2xl border p-5 ${item.bg}`}>
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

      {/* ── Recent users table ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex justify-between items-center px-5.5 py-4.5 border-b border-zinc-100 dark:border-zinc-800">
          <h3
            className="font-bold text-zinc-900 dark:text-white"
            style={{ fontSize: 16 }}
          >
            Recent users
          </h3>
          <a
            href="/dashboard/users"
            className="text-blue-700 dark:text-blue-400 font-semibold hover:underline transition-colors"
            style={{ fontSize: 13 }}
          >
            Manage →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full"
            style={{ fontSize: 14, borderCollapse: "collapse" }}
          >
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                {["User", "Role", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-[0.04em] border-b border-zinc-100 dark:border-zinc-800"
                    style={{ fontSize: 11, padding: "12px 22px" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.length > 0 ? (
                recentUsers.map((u: any, i: number) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td style={{ padding: "14px 22px" }}>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="grid place-items-center text-white font-bold rounded-full shrink-0"
                          style={{
                            width: 32,
                            height: 32,
                            background:
                              "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                            fontSize: 13,
                          }}
                        >
                          {(u.name ?? u.email ?? "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">
                            {u.name ?? "—"}
                          </div>
                          <div
                            className="text-zinc-400"
                            style={{ fontSize: 12 }}
                          >
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        style={{ fontSize: 11 }}
                      >
                        {u.role ?? "—"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full font-bold ${
                          u.banned
                            ? "bg-red-100 text-red-600"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                        style={{ fontSize: 11 }}
                      >
                        {u.banned ? "Suspended" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-zinc-400 py-10"
                    style={{ fontSize: 14 }}
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { getSession } from "@/service/auth";
import { getTutorBookings, getSingleTutor } from "@/service/tutor/user.services";
import {
  Star,
  Mail,
  Clock,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  BookOpen,
  TrendingUp,
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

export default async function TutorProfile() {
  const [sessionRes, bookingsRes] = await Promise.all([
    getSession(),
    getTutorBookings(),
  ]);

  const user: any    = sessionRes?.data?.user ?? sessionRes?.data ?? {};
  const bookings: any[] = Array.isArray(bookingsRes)
    ? bookingsRes
    : (bookingsRes?.bookings ?? bookingsRes?.data ?? []);

  /* Try to fetch tutor-specific profile by user ID */
  let tutorProfile: any = null;
  if (user?.id) {
    const t = await getSingleTutor(user.id).catch(() => null);
    if (t && !t.error) tutorProfile = t?.result ?? t?.data ?? t;
  }

  const upcoming  = bookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const earnings  = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s: number, b: any) => s + (Number(b.price) || 0), 0);

  const name     = user?.name ?? tutorProfile?.name ?? "Tutor";
  const email    = user?.email ?? "—";
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const joined   = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  const bio         = tutorProfile?.bio ?? tutorProfile?.description ?? null;
  const hourlyRate  = tutorProfile?.hourlyRate ?? null;
  const experience  = tutorProfile?.experience ?? null;
  const rating      = tutorProfile?.rating ?? null;
  const category    = tutorProfile?.category?.name ?? null;

  /* Parse availability */
  let availability: Record<string, string[]> = {};
  try {
    const raw = tutorProfile?.availability;
    if (raw) availability = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore */ }

  const availDays = Object.keys(availability);

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Hero card ── */}
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        {/* Banner */}
        <div
          className="h-28"
          style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#3b82f6 100%)" }}
        />

        <div className="px-7 pb-7">
          {/* Avatar row */}
          <div className="flex items-end gap-5 -mt-10 mb-5">
            <div
              className="w-20 h-20 rounded-2xl border-4 border-white dark:border-zinc-900 grid place-items-center text-white font-black text-2xl shadow-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}
            >
              {initials}
            </div>
            <div className="pb-1 min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 mb-1">
                <Star className="size-3" /> Tutor
              </span>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight truncate">
                {name}
              </h1>
              {category && (
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{category}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border-l-2 border-blue-400">
              {bio}
            </p>
          )}

          {/* Info grid */}
          <div className="grid sm:grid-cols-2 gap-2.5">
            <InfoRow icon={<Mail className="size-4 text-zinc-400" />}          label="Email"         value={email} />
            <InfoRow icon={<Clock className="size-4 text-zinc-400" />}         label="Member since"  value={joined} />
            {hourlyRate && (
              <InfoRow
                icon={<DollarSign className="size-4 text-emerald-500" />}
                label="Hourly rate"
                value={`$${hourlyRate} / hr`}
                valueClass="text-emerald-600 dark:text-emerald-400 font-bold"
              />
            )}
            {experience && (
              <InfoRow icon={<TrendingUp className="size-4 text-blue-500" />}  label="Experience"    value={String(experience)} />
            )}
            {rating && (
              <InfoRow
                icon={<Star className="size-4 text-yellow-500" />}
                label="Rating"
                value={`⭐ ${Number(rating).toFixed(1)} / 5`}
                valueClass="text-yellow-600 dark:text-yellow-400 font-bold"
              />
            )}
            <InfoRow
              icon={<CheckCircle2 className="size-4 text-emerald-500" />}
              label="Account status"
              value="Active"
              valueClass="text-emerald-600 dark:text-emerald-400 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* ── Session stats ── */}
      <div>
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em] mb-3">
          My performance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <CalendarDays className="size-4" />, label: "Total sessions",  value: bookings.length, bg: "bg-zinc-50 dark:bg-zinc-800",         num: "text-zinc-900 dark:text-white"          },
            { icon: <BookOpen className="size-4" />,     label: "Upcoming",         value: upcoming,        bg: "bg-blue-50 dark:bg-blue-950/20",       num: "text-blue-700 dark:text-blue-400"       },
            { icon: <CheckCircle2 className="size-4" />, label: "Completed",        value: completed,       bg: "bg-emerald-50 dark:bg-emerald-950/20", num: "text-emerald-700 dark:text-emerald-400" },
            { icon: <DollarSign className="size-4" />,   label: "Total earned",     value: `$${earnings}`,  bg: "bg-indigo-50 dark:bg-indigo-950/20",   num: "text-indigo-700 dark:text-indigo-400"   },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 ${s.bg}`}>
              <div className={`mb-2 opacity-60 ${s.num}`}>{s.icon}</div>
              <div className={`text-2xl font-extrabold tracking-tight ${s.num}`}>{s.value}</div>
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Availability ── */}
      {availDays.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6">
          <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em] mb-4">
            Weekly availability
          </h2>
          <div className="space-y-2.5">
            {availDays.map((day) => (
              <div
                key={day}
                className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3"
              >
                <span className="w-20 text-xs font-bold text-zinc-500 uppercase tracking-wide capitalize shrink-0">
                  {day}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(availability[day] ?? []).map((slot: string) => (
                    <span
                      key={slot}
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

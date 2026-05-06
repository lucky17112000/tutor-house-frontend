import { Skeleton } from "@/components/ui/skeleton";

/* ── Hero skeleton (full-screen slide) ── */
function HeroSk() {
  return (
    <div className="relative w-full min-h-screen bg-zinc-900 overflow-hidden">
      {/* Background image skeleton */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg,#0a0a0a 0%,#1e3a8a 55%,#1d4ed8 100%)",
          opacity: 0.9,
        }}
      />
      {/* Shimmer wave over hero */}
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(219,234,254,0.07) 45%,rgba(255,255,255,0.1) 55%,transparent 100%)",
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />

      {/* Content skeleton */}
      <div className="relative z-10 px-8 sm:px-14 lg:px-24 pt-36 pb-16 space-y-6">
        {/* Eyebrow */}
        <Skeleton className="w-56 h-3.5 rounded-full bg-white/15" />
        {/* Headline */}
        <div className="space-y-3">
          <Skeleton className="w-3/4 h-16 rounded-2xl bg-white/15" style={{ maxWidth: 560 }} />
          <Skeleton className="w-2/3 h-16 rounded-2xl bg-white/15" style={{ maxWidth: 460 }} />
          <Skeleton className="w-1/2 h-16 rounded-2xl bg-white/15" style={{ maxWidth: 360 }} />
        </div>
        {/* Subtitle */}
        <div className="space-y-2" style={{ maxWidth: 480 }}>
          <Skeleton className="w-full h-3.5 rounded-full bg-white/15" />
          <Skeleton className="w-5/6 h-3.5 rounded-full bg-white/15" />
          <Skeleton className="w-4/6 h-3.5 rounded-full bg-white/15" />
        </div>
        {/* CTAs */}
        <div className="flex gap-4 pt-2">
          <Skeleton className="w-40 h-12 rounded-full bg-white/20" />
          <Skeleton className="w-36 h-12 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-5 px-8 grid grid-cols-4 gap-6 bg-black/40">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-1.5">
            <Skeleton className="w-20 h-8 rounded-xl mx-auto bg-white/15" />
            <Skeleton className="w-24 h-2.5 rounded-full mx-auto bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Generic dark section skeleton ── */
function DarkSectionSk() {
  return (
    <div className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <Skeleton className="w-32 h-3.5 rounded-full bg-white/10" />
          <Skeleton className="w-80 h-8 rounded-xl bg-white/10" />
          <Skeleton className="w-96 h-3.5 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-72 rounded-3xl bg-white/8" />
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-start">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0 bg-white/10" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="w-40 h-4 rounded-lg bg-white/10" />
                  <Skeleton className="w-full h-3 rounded-full bg-white/8" />
                  <Skeleton className="w-4/5 h-3 rounded-full bg-white/8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Generic light section skeleton ── */
function LightSectionSk() {
  return (
    <div className="bg-white dark:bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <Skeleton className="w-28 h-3 rounded-full" />
          <Skeleton className="w-72 h-7 rounded-xl" />
          <Skeleton className="w-88 h-3.5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 space-y-3 bg-zinc-50 dark:bg-zinc-900"
            >
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-36 h-5 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="w-full h-3 rounded-full" />
                <Skeleton className="w-5/6 h-3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip skeleton ── */
function StatsSk() {
  return (
    <div className="bg-[#0a0a0a] py-24 px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pl-6 space-y-2" style={{ borderLeft: "1px solid rgba(255,255,255,0.12)" }}>
            <Skeleton className="w-28 h-10 rounded-xl bg-white/10" />
            <Skeleton className="w-20 h-3 rounded-full bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Full landing page skeleton ── */
export function LandingPageSk() {
  return (
    <div className="overflow-x-hidden">
      <HeroSk />
      <DarkSectionSk />
      <LightSectionSk />
      <StatsSk />
      <LightSectionSk />
    </div>
  );
}

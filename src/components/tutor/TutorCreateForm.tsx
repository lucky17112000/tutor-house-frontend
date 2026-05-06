"use client";

import { createTutor } from "@/service/tutor/user.services";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { useState } from "react";
import { toast } from "sonner";
import {
  User, FileText, Briefcase, DollarSign, Clock,
  Plus, X, Calendar, ChevronRight, CheckCircle2, LayoutGrid,
} from "lucide-react";

const DAYS = [
  { key: "monday",    short: "Mon" },
  { key: "tuesday",   short: "Tue" },
  { key: "wednesday", short: "Wed" },
  { key: "thursday",  short: "Thu" },
  { key: "friday",    short: "Fri" },
  { key: "saturday",  short: "Sat" },
  { key: "sunday",    short: "Sun" },
];

interface Category {
  id: string;
  name: string;
  description?: string;
}

type Availability = Record<string, string[]>;

/* ── Shared field wrapper ── */
function Field({
  label, icon, children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
        <span className="text-indigo-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[14px] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.13)] transition-all duration-200";

/* ── Pastel colour palette for category cards ── */
const CATEGORY_COLORS = [
  { bg: "bg-indigo-50 dark:bg-indigo-950/40",   border: "border-indigo-200 dark:border-indigo-800",   text: "text-indigo-700 dark:text-indigo-300",   dot: "bg-indigo-500"   },
  { bg: "bg-violet-50 dark:bg-violet-950/40",   border: "border-violet-200 dark:border-violet-800",   text: "text-violet-700 dark:text-violet-300",   dot: "bg-violet-500"   },
  { bg: "bg-blue-50 dark:bg-blue-950/40",       border: "border-blue-200 dark:border-blue-800",       text: "text-blue-700 dark:text-blue-300",       dot: "bg-blue-500"     },
  { bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  { bg: "bg-rose-50 dark:bg-rose-950/40",       border: "border-rose-200 dark:border-rose-800",       text: "text-rose-700 dark:text-rose-300",       dot: "bg-rose-500"     },
  { bg: "bg-amber-50 dark:bg-amber-950/40",     border: "border-amber-200 dark:border-amber-800",     text: "text-amber-700 dark:text-amber-300",     dot: "bg-amber-500"   },
  { bg: "bg-cyan-50 dark:bg-cyan-950/40",       border: "border-cyan-200 dark:border-cyan-800",       text: "text-cyan-700 dark:text-cyan-300",       dot: "bg-cyan-500"     },
  { bg: "bg-pink-50 dark:bg-pink-950/40",       border: "border-pink-200 dark:border-pink-800",       text: "text-pink-700 dark:text-pink-300",       dot: "bg-pink-500"     },
];

function colorForIndex(i: number) {
  return CATEGORY_COLORS[i % CATEGORY_COLORS.length];
}

export default function TutorCreateForm({
  initialCategoryId = "",
  categories = [],
}: {
  initialCategoryId?: string;
  categories?: Category[];
}) {
  const router = useRouter();

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const [availability, setAvailability]             = useState<Availability>({});
  const [slotInputs, setSlotInputs]                 = useState<Record<string, { start: string; end: string }>>({});

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;

  /* ── Day toggle ── */
  const toggleDay = (day: string) => {
    setAvailability((prev) => {
      const next = { ...prev };
      if (next[day]) delete next[day];
      else next[day] = [];
=======
import React, { useState } from "react";
import { toast } from "sonner";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type Availability = Record<string, string[]>;

export default function TutorCreateForm({ id }: { id: string }) {
  const router = useRouter();
  // console.log("recived: ", id);
  const [availability, setAvailability] = useState<Availability>({});
  const [slotInputs, setSlotInputs] = useState<Record<string, string>>({});

  // Toggle a day on/off
  const toggleDay = (day: string) => {
    setAvailability((prev) => {
      const next = { ...prev };
      if (next[day]) {
        delete next[day];
      } else {
        next[day] = [];
      }
>>>>>>> afa85866013a6a9d91e24184f725ac3f34268be9
      return next;
    });
  };

<<<<<<< HEAD
  /* ── Add slot ── */
  const addSlot = (day: string) => {
    const { start = "", end = "" } = slotInputs[day] ?? {};
    if (!start || !end) { toast.error("Please pick both a start and end time."); return; }
    if (start >= end)   { toast.error("End time must be after start time.");      return; }
    setAvailability((prev) => ({ ...prev, [day]: [...(prev[day] ?? []), `${start}-${end}`] }));
    setSlotInputs((prev) => ({ ...prev, [day]: { start: "", end: "" } }));
  };

  /* ── Remove slot ── */
  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({ ...prev, [day]: prev[day].filter((_, i) => i !== index) }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e: { preventDefault(): void; currentTarget: EventTarget | null }) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      toast.error("Please select a category before submitting.");
      return;
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      name:         formData.get("name"),
      bio:          formData.get("bio"),
      experience:   formData.get("experience") as string,
      hourlyRate:   Number(formData.get("hourlyRate")),
      availability: JSON.stringify(availability),
      categoryId:   selectedCategoryId,
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    const result = await createTutor(payload);
    if (result.error) {
      toast.error("Failed to create tutor profile", { description: result.error });
    } else {
      toast.success("Tutor profile created successfully!");
      router.push("/tutor");
    }
  };

  const selectedDays = Object.keys(availability);

  return (
    <div className="flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(79,70,229,0.18)] border border-zinc-200/80 dark:border-zinc-800">

          {/* ── Gradient header ── */}
          <div className="relative bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 px-8 py-8 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 mb-4">
                <User className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">New Profile</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Tutor Profile</h2>
              <p className="text-indigo-200 text-[14px] mt-1.5">Fill in your details and set your weekly availability.</p>
            </div>
          </div>

          {/* ── Form body ── */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 px-8 py-8 space-y-6">

            {/* Name */}
            <Field label="Full Name" icon={<User className="size-3.5" />}>
              <input name="name" required className={inputCls} placeholder="e.g. Sarah Johnson" />
            </Field>

            {/* Bio */}
            <Field label="Bio" icon={<FileText className="size-3.5" />}>
              <textarea
                name="bio" rows={3}
                className={`${inputCls} resize-none`}
                placeholder="Tell students about your teaching style, background, and expertise…"
              />
            </Field>

            {/* Experience + Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Experience" icon={<Briefcase className="size-3.5" />}>
                <input name="experience" type="text" className={inputCls} placeholder="e.g. 3 years" />
              </Field>
              <Field label="Hourly Rate (USD)" icon={<DollarSign className="size-3.5" />}>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-[14px]">$</span>
                  <input name="hourlyRate" type="number" min={0} className={`${inputCls} pl-7`} placeholder="25" />
                </div>
              </Field>
            </div>

            {/* ── Category selector ── */}
            <Field label="Category" icon={<LayoutGrid className="size-3.5" />}>
              {categories.length === 0 ? (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[13px]">
                  <Calendar className="size-4 shrink-0" />
                  No categories available yet. Ask an admin to create one.
                </div>
              ) : (
                <>
                  {/* Selected banner */}
                  {selectedCategory && (
                    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 mb-3">
                      <CheckCircle2 className="size-4 text-indigo-500 shrink-0" />
                      <span className="text-[13px] font-semibold text-indigo-700 dark:text-indigo-300">
                        Selected: <span className="font-bold">{selectedCategory.name}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedCategoryId("")}
                        className="ml-auto text-indigo-400 hover:text-red-500 transition-colors"
                        aria-label="Clear selection"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Category cards grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {categories.map((cat, i) => {
                      const color     = colorForIndex(i);
                      const isActive  = selectedCategoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategoryId(cat.id)}
                          className={`relative group flex flex-col gap-1 p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                            isActive
                              ? `${color.bg} ${color.border} shadow-md scale-[1.02]`
                              : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20"
                          }`}
                        >
                          {/* Colour dot */}
                          <span className={`w-2 h-2 rounded-full ${isActive ? color.dot : "bg-zinc-300 dark:bg-zinc-600 group-hover:bg-indigo-400"} transition-colors`} />

                          <span className={`text-[13px] font-bold leading-snug ${isActive ? color.text : "text-zinc-700 dark:text-zinc-200"}`}>
                            {cat.name}
                          </span>

                          {cat.description && (
                            <span className={`text-[11px] leading-relaxed line-clamp-2 ${isActive ? color.text + " opacity-80" : "text-zinc-400 dark:text-zinc-500"}`}>
                              {cat.description}
                            </span>
                          )}

                          {isActive && (
                            <CheckCircle2 className={`absolute top-2.5 right-2.5 size-3.5 ${color.text}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </Field>

            {/* ── Availability ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-indigo-500" />
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                  Weekly Availability
                </span>
                {selectedDays.length > 0 && (
                  <span className="ml-auto text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900">
                    {selectedDays.length} day{selectedDays.length !== 1 ? "s" : ""} selected
                  </span>
                )}
              </div>

              {/* Day pills */}
              <div className="flex flex-wrap gap-2">
                {DAYS.map(({ key, short }) => {
                  const active     = availability[key] !== undefined;
                  const slotCount  = availability[key]?.length ?? 0;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleDay(key)}
                      className={`relative flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl text-[12px] font-bold border transition-all duration-200 select-none ${
                        active
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105"
                          : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      {short}
                      {active && slotCount > 0 && (
                        <span className="text-[9px] font-semibold text-indigo-200 leading-none">
                          {slotCount} slot{slotCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDays.length === 0 && (
                <p className="text-[13px] text-zinc-400 dark:text-zinc-500 italic text-center py-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700">
                  Tap a day above to set your available time slots
                </p>
              )}

              {/* Per-day slot editors */}
              <div className="space-y-3">
                {DAYS.filter(({ key }) => availability[key] !== undefined).map(({ key, short }) => (
                  <div key={key} className="rounded-2xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/20 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-indigo-100 dark:border-indigo-900/60 bg-indigo-100/60 dark:bg-indigo-950/40">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[11px] font-black shrink-0">
                        {short[0]}
                      </span>
                      <span className="text-[13px] font-bold text-indigo-800 dark:text-indigo-300 capitalize">{key}</span>
                      <button
                        type="button"
                        onClick={() => toggleDay(key)}
                        className="ml-auto w-6 h-6 rounded-lg bg-indigo-200/70 dark:bg-indigo-900/50 grid place-items-center text-indigo-500 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    <div className="px-4 py-3 space-y-3">
                      {availability[key].length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {availability[key].map((slot, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-indigo-600 text-white shadow-sm">
                              <Clock className="size-3 opacity-80" />
                              {slot}
                              <button type="button" onClick={() => removeSlot(key, i)} className="ml-0.5 hover:text-red-200 transition-colors">
                                <X className="size-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="flex-1 space-y-0.5">
                            <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">Start</p>
                            <input
                              type="time"
                              value={slotInputs[key]?.start ?? ""}
                              onChange={(e) => setSlotInputs((prev) => ({ ...prev, [key]: { ...prev[key], start: e.target.value } }))}
                              className="w-full px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-900 text-[13px] text-zinc-900 dark:text-white outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.13)] transition-all"
                            />
                          </div>
                          <ChevronRight className="size-4 text-indigo-400 shrink-0 mt-5" />
                          <div className="flex-1 space-y-0.5">
                            <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">End</p>
                            <input
                              type="time"
                              value={slotInputs[key]?.end ?? ""}
                              onChange={(e) => setSlotInputs((prev) => ({ ...prev, [key]: { ...prev[key], end: e.target.value } }))}
                              className="w-full px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-900 text-[13px] text-zinc-900 dark:text-white outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.13)] transition-all"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addSlot(key)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12.5px] font-semibold transition-colors shadow-sm shrink-0 mt-5"
                        >
                          <Plus className="size-3.5" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-[15px] font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:opacity-95 active:scale-[0.98] transition-all duration-200"
            >
              <User className="size-4" />
              Create Tutor Profile
            </button>
          </form>
        </div>
      </div>
    </div>
=======
  // Add a time slot to a day
  const addSlot = (day: string) => {
    const slot = slotInputs[day]?.trim();
    if (!slot) return;
    // basic format check e.g. 10:00-12:00
    if (!/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(slot)) {
      toast.error("Format must be HH:MM-HH:MM (e.g. 10:00-12:00)");
      return;
    }
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] ?? []), slot],
    }));
    setSlotInputs((prev) => ({ ...prev, [day]: "" }));
  };

  // Remove a slot
  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      experience: formData.get("experience") as string,
      hourlyRate: Number(formData.get("hourlyRate")),
      availability: JSON.stringify(availability), // backend expects JSON string
      categoryId: id,
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));
    toast.success("Availability JSON ready!", {
      description: (
        <pre className="text-xs mt-1 bg-zinc-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(availability, null, 2)}
        </pre>
      ),
      action: {
        label: "Go to Dashboard",
        onClick: () => router.push("/dashboard/booking"),
      },
    });

    // TODO: call your createTutor service here
    // await createTutor(payload);
    const result = await createTutor(payload);
    if (result.error) {
      toast.error("Failed to create tutor profile", {
        description: result.error,
      });
    } else {
      toast.success("Tutor profile created successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold text-indigo-600">
        Create Tutor Profile
      </h2>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          name="name"
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="John Doe"
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Bio</label>
        <textarea
          name="bio"
          rows={3}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          placeholder="Short description about yourself..."
        />
      </div>

      {/* Experience & Hourly Rate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Experience (years)
          </label>
          <input
            name="experience"
            type="text"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="1years"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Hourly Rate ($)
          </label>
          <input
            name="hourlyRate"
            type="number"
            min={0}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="25"
          />
        </div>
      </div>

      {/* Category (second to last) */}
      {id && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Category</label>
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 text-sm">
            <span className="text-indigo-500 font-medium">Category ID:</span>
            <span className="font-mono text-indigo-800 text-xs break-all">
              {id}
            </span>
          </div>
        </div>
      )}

      {/* Availability Picker */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-600">
          Availability
        </label>

        {/* Day checkboxes */}
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`capitalize px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                availability[day] !== undefined
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Slot inputs per selected day */}
        {Object.keys(availability).map((day) => (
          <div
            key={day}
            className="bg-indigo-50 rounded-xl px-4 py-3 flex flex-col gap-2"
          >
            <span className="capitalize text-indigo-700 font-semibold text-sm">
              {day}
            </span>

            {/* Existing slots */}
            <div className="flex flex-wrap gap-1.5">
              {availability[day].map((slot, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {slot}
                  <button
                    type="button"
                    onClick={() => removeSlot(day, i)}
                    className="text-indigo-400 hover:text-red-500 font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add new slot */}
            <div className="flex gap-2">
              <input
                type="text"
                value={slotInputs[day] ?? ""}
                onChange={(e) =>
                  setSlotInputs((prev) => ({ ...prev, [day]: e.target.value }))
                }
                placeholder="10:00-12:00"
                className="border rounded-lg px-3 py-1.5 text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => addSlot(day)}
                className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
              >
                + Add
              </button>
            </div>
          </div>
        ))}

        {/* Live JSON preview */}
        {Object.keys(availability).length > 0 && (
          <details className="text-xs text-gray-400 cursor-pointer">
            <summary className="select-none">Preview JSON</summary>
            <pre className="mt-1 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg overflow-x-auto text-zinc-700 dark:text-zinc-300">
              {JSON.stringify(availability, null, 2)}
            </pre>
          </details>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all"
      >
        Create Profile
      </button>
    </form>
>>>>>>> afa85866013a6a9d91e24184f725ac3f34268be9
  );
}

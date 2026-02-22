"use client";

import { createTutor } from "@/service/tutor/user.services";
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
  console.log("recived: ", id);
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
      return next;
    });
  };

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
  );
}

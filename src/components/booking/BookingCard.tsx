"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/service/booking";
import { toast } from "sonner";

// ============================================================
// বুকিং কার্ড কম্পোনেন্ট — টিউটর বুকিং তৈরি করার জন্য
// টিউটরের availability থেকে সেশনের দিন ও সময় স্লট দেখানো হয়
// ছাত্র সেই স্লট সিলেক্ট করে বুকিং কনফার্ম করবে
// ============================================================

// টিউটর ডেটার টাইপ — সার্ভার রেসপন্স (res.result) থেকে আসে
type TutorData = {
  id: string;
  name: string;
  bio?: string;
  description?: string;
  hourlyRate: number;
  imageUrl?: string;
  rating?: number;
  category?: { name: string };
  // availability — res থেকে আসে, প্রতিটি দিনের জন্য সময় স্লট
  // যেমন: { "saturday": ["9:00-10:00","11:00-12:00"], "monday": ["14:00-15:00"] }
  availability?: Record<string, string[]>;
};

// বুকিং পেলোড টাইপ — সার্ভারে পাঠানো হবে (Prisma মডেল অনুযায়ী)
export type BookingPayload = {
  sessionDate: string; // সেশনের তারিখ (ISO DateTime)
  startTime: string; // শুরুর সময় (ISO DateTime)
  endTime: string; // শেষের সময় (ISO DateTime)
  price: number; // সেশনের মূল্য (Float)
  tutorId: string; // টিউটরের আইডি (String)
};

// কম্পোনেন্ট প্রপস — পেরেন্ট থেকে টিউটর ডেটা ও আইডি আসে
interface BookingCardProps {
  tutor: TutorData; // res.result — টিউটরের সম্পূর্ণ তথ্য
  tutorId: string; // URL প্যারাম থেকে প্রাপ্ত টিউটর আইডি
}

// ========================================
// হেল্পার ফাংশন — নির্দিষ্ট দিনের পরবর্তী তারিখ বের করে
// যেমন: "saturday" দিলে আগামী শনিবারের তারিখ রিটার্ন করবে
// ========================================
const dayNameToIndex: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

// দিনের নাম থেকে পরবর্তী সেই দিনের Date বের করার ফাংশন
function getNextDateForDay(dayName: string): Date {
  const today = new Date();
  const targetDay = dayNameToIndex[dayName.toLowerCase()];
  // যদি দিনের নাম ভুল হয়, আজকের তারিখ ফেরত দাও
  if (targetDay === undefined) return today;
  const currentDay = today.getDay();
  // কত দিন পরে সেই দিন আসবে সেটা হিসাব করা হচ্ছে
  let daysUntil = targetDay - currentDay;
  if (daysUntil <= 0) daysUntil += 7; // আজকে বা আগে হলে পরের সপ্তাহে যাও
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntil);
  return nextDate;
}

// বাংলায় দিনের নাম দেখানোর জন্য ম্যাপ
const dayNameBangla: Record<string, string> = {
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
};

export default function BookingCard({ tutor, tutorId }: BookingCardProps) {
  // ========================================
  // res থেকে প্রাপ্ত availability পার্স করে নেয়া
  // availability হলো দিন => সময় স্লটের অ্যারে
  // ========================================
  let availability: Record<string, string[]> = {};
  try {
    const raw = tutor.availability;
    if (raw) {
      // যদি স্ট্রিং আসে তাহলে JSON পার্স, নইলে সরাসরি ব্যবহার
      availability = typeof raw === "string" ? JSON.parse(raw as string) : raw;
    }
  } catch {
    availability = {};
  }

  // availability তে যত দিন আছে তার তালিকা
  const availableDays = Object.keys(availability);

  // ========================================
  // স্টেট ম্যানেজমেন্ট
  // ========================================

  // কোন দিন সিলেক্ট করা হয়েছে (যেমন: "saturday")
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // কোন টাইম স্লট সিলেক্ট করা হয়েছে (যেমন: "9:00-10:00")
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // লোডিং স্টেট — বুকিং সাবমিটের সময় বাটন নিষ্ক্রিয় রাখতে
  const [isLoading, setIsLoading] = useState(false);

  // ========================================
  // সিলেক্টেড স্লট থেকে বুকিং ডেটা তৈরি করা
  // ========================================

  // সিলেক্ট করা দিনের পরবর্তী তারিখ বের করা হচ্ছে
  const sessionDateObj = selectedDay ? getNextDateForDay(selectedDay) : null;

  // সিলেক্ট করা স্লট থেকে শুরু ও শেষ সময় আলাদা করা
  // স্লট ফরম্যাট: "9:00-10:00" → startTimeStr = "9:00", endTimeStr = "10:00"
  const [startTimeStr, endTimeStr] = selectedSlot
    ? selectedSlot.split("-").map((s) => s.trim())
    : [null, null];

  // মূল্য — res থেকে আসা hourlyRate সরাসরি ব্যবহার হচ্ছে
  const price = tutor.hourlyRate ?? 0;

  // ========================================
  // বুকিং সাবমিট হ্যান্ডলার
  // ========================================
  const handleBooking = async () => {
    // ভ্যালিডেশন — দিন ও স্লট সিলেক্ট হয়েছে কিনা
    if (!selectedDay || !selectedSlot || !sessionDateObj) {
      alert("অনুগ্রহ করে একটি দিন এবং সময় স্লট নির্বাচন করুন!");
      return;
    }

    // ISO ফরম্যাটে তারিখ স্ট্রিং তৈরি (YYYY-MM-DD)
    const dateStr = sessionDateObj.toISOString().split("T")[0];

    // বুকিং পেলোড তৈরি — Prisma মডেল অনুযায়ী ডেটা সাজানো হচ্ছে
    const bookingData: BookingPayload = {
      // সেশনের তারিখ — নির্বাচিত দিনের পরবর্তী তারিখ ISO তে
      sessionDate: new Date(dateStr).toISOString(),
      // শুরুর সময় — তারিখ + স্লটের শুরু সময় মিলিয়ে ISO
      startTime: new Date(`${dateStr}T${startTimeStr}:00`).toISOString(),
      // শেষের সময় — তারিখ + স্লটের শেষ সময় মিলিয়ে ISO
      endTime: new Date(`${dateStr}T${endTimeStr}:00`).toISOString(),
      // মূল্য — res থেকে আসা hourlyRate
      price: price,
      // টিউটর আইডি — URL প্যারাম (id) থেকে সেট
      tutorId: tutorId,
    };

    console.log("📦 বুকিং ডেটা তৈরি হয়েছে:", bookingData);

    // =================================================
    // 🔽 এখানে আপনার সার্ভিস ফাংশন কল করুন 🔽
    // উদাহরণ: const result = await createBooking(bookingData);
    // =================================================

    // TODO: এখানে সার্ভিস ফাংশন কল করুন
    try {
      setIsLoading(true);

      const result = await createBooking(bookingData as BookingPayload);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Booking created successfully!");

        setSelectedDay(null);
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      // লোডিং শেষ — বাটন আবার সক্রিয় করা হচ্ছে
      setIsLoading(false);
    }
  };

  // ========================================
  // UI রেন্ডার — প্রফেশনাল বুকিং কার্ড
  // ========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <Card className="w-full max-w-xl shadow-2xl border-0 overflow-hidden">
        {/* ============================== */}
        {/* টিউটরের ছবি ও নাম সেকশন */}
        {/* ============================== */}
        <div className="relative">
          {/* টিউটরের প্রোফাইল ছবি — res থেকে imageUrl আসে */}
          <img
            src={tutor.imageUrl || "/images/photo-1554475901-4538ddfbccc2.avif"}
            alt={tutor.name}
            className="w-full h-48 object-cover"
          />
          {/* ছবির উপরে গ্রেডিয়েন্ট ওভারলে */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* টিউটরের নাম ও ক্যাটেগরি — res থেকে সরাসরি দেখানো */}
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-bold drop-shadow-md">{tutor.name}</h2>
            {tutor.category && (
              <span className="text-sm opacity-90 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {tutor.category.name}
              </span>
            )}
          </div>

          {/* মূল্য ব্যাজ — res থেকে hourlyRate দেখানো হচ্ছে */}
          <div className="absolute top-3 right-3 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            ৳{price}/ঘণ্টা
          </div>
        </div>

        {/* ============================== */}
        {/* কার্ড হেডার — শিরোনাম ও বিবরণ */}
        {/* ============================== */}
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📅 Create Booking
          </CardTitle>
          <CardDescription className="text-sm">
            {/* টিউটরের বায়ো — res থেকে bio বা description দেখানো */}
            {tutor.bio ?? tutor.description ?? "no description available"}
          </CardDescription>
        </CardHeader>

        {/* ============================== */}
        {/* কার্ড কনটেন্ট — availability থেকে দিন ও স্লট দেখানো */}
        {/* ============================== */}
        <CardContent className="space-y-5">
          {/* ------- রেটিং দেখানো — res.result.rating থেকে ------- */}
          {tutor.rating && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              <span>⭐ Rating:</span>
              <span className="font-bold">{tutor.rating}/5</span>
            </div>
          )}

          {/* বিভাজক রেখা */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-zinc-600 to-transparent" />

          {/* ============================== */}
          {/* ১ম ধাপ: দিন নির্বাচন — res.result.availability এর দিনগুলো */}
          {/* ============================== */}
          {availableDays.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                📆 Available session days
              </h3>
              {/* প্রতিটি available দিন বাটন হিসেবে দেখানো হচ্ছে */}
              <div className="flex flex-wrap gap-2">
                {availableDays.map((day) => {
                  // সিলেক্ট করা দিন কিনা চেক করা হচ্ছে
                  const isActive = selectedDay === day;
                  // ঐ দিনের পরবর্তী তারিখ হিসাব করা হচ্ছে
                  const nextDate = getNextDateForDay(day);
                  const dateLabel = nextDate.toLocaleDateString("bn-BD", {
                    day: "numeric",
                    month: "short",
                  });
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        // দিন সিলেক্ট করলে আগের স্লট সিলেকশন রিসেট হবে
                        setSelectedDay(day);
                        setSelectedSlot(null);
                      }}
                      className={`
                        flex flex-col items-center px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer
                        ${
                          isActive
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 shadow-md scale-105"
                            : "border-gray-200 dark:border-zinc-600 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-zinc-700"
                        }
                      `}
                    >
                      {/* বাংলায় দিনের নাম */}
                      <span
                        className={`text-sm font-bold ${
                          isActive
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {dayNameBangla[day.toLowerCase()] ?? day}
                      </span>
                      {/* পরবর্তী তারিখ দেখানো — sessionDate এখান থেকে সেট হবে */}
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {dateLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // যদি কোনো availability না থাকে তাহলে মেসেজ দেখাও
            <div className="text-center py-6 text-gray-400">
              <p className="text-lg">🚫</p>
              <p className="text-sm">
                No available session days found for this tutor.
              </p>
            </div>
          )}

          {/* ============================== */}
          {/* ২য় ধাপ: সময় স্লট নির্বাচন — সিলেক্ট করা দিনের স্লটগুলো */}
          {/* res.result.availability[selectedDay] থেকে startTime ও endTime আসে */}
          {/* ============================== */}
          {selectedDay && availability[selectedDay] && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                🕐 Available time slots (
                {dayNameBangla[selectedDay.toLowerCase()] ?? selectedDay})
              </h3>
              {/* ঐ দিনের সব সময় স্লট কার্ড হিসেবে দেখানো */}
              <div className="grid grid-cols-2 gap-3">
                {availability[selectedDay].map((slot, idx) => {
                  // সিলেক্ট করা স্লট কিনা চেক করা
                  const isActive = selectedSlot === slot;
                  // স্লটের শুরু ও শেষ সময় আলাদা করা (যেমন: "9:00-10:00")
                  const [slotStart, slotEnd] = slot
                    .split("-")
                    .map((s) => s.trim());
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      className={`
                        relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                        ${
                          isActive
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 shadow-lg scale-[1.03]"
                            : "border-gray-200 dark:border-zinc-600 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                        }
                      `}
                    >
                      {/* সিলেক্টেড চেক আইকন */}
                      {isActive && (
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow">
                          ✓
                        </span>
                      )}

                      {/* শুরুর সময় — res এর availability স্লট থেকে */}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        শুরু
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          isActive
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {slotStart}
                      </span>

                      {/* তীর চিহ্ন */}
                      <span className="text-gray-400 text-xs my-0.5">▼</span>

                      {/* শেষের সময় — res এর availability স্লট থেকে */}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        শেষ
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          isActive
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {slotEnd}
                      </span>

                      {/* মূল্য — res থেকে আসা hourlyRate দেখানো */}
                      <span className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-800/40 px-2 py-0.5 rounded-full">
                        ৳{price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* বিভাজক রেখা */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-zinc-600 to-transparent" />

          {/* ------- টিউটর আইডি প্রদর্শন — URL param (id) থেকে সেট ------- */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              🆔 টিউটর আইডি
            </span>
            <div className="bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs font-mono px-3 py-2 rounded-md break-all">
              {/* tutorId — URL প্যারাম থেকে সরাসরি আসে, বুকিং পেলোডে যায় */}
              {tutorId}
            </div>
          </div>

          {/* ============================== */}
          {/* বুকিং সারাংশ — দিন ও স্লট দুটোই সিলেক্ট হলে দেখাবে */}
          {/* সব ডেটা res থেকে আসা তথ্য দিয়ে সেট করা */}
          {/* ============================== */}
          {selectedDay && selectedSlot && sessionDateObj && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 space-y-2.5 border border-indigo-200 dark:border-indigo-700">
              <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                📋 Booking summary
              </h4>

              {/* সেশনের তারিখ — নির্বাচিত দিনের পরবর্তী তারিখ */}
              <p className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>📆 Session date:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {sessionDateObj.toLocaleDateString("bn-BD", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>

              {/* শুরুর সময় — স্লট থেকে সেট */}
              <p className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>🕐 Start time:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {startTimeStr}
                </span>
              </p>

              {/* শেষের সময় — স্লট থেকে সেট */}
              <p className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>🕑 End time:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {endTimeStr}
                </span>
              </p>

              {/* মূল্য — res থেকে hourlyRate */}
              <p className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>💰 Price:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-300 text-sm">
                  ৳{price}
                </span>
              </p>

              {/* টিউটর আইডি — URL param থেকে */}
              <p className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>🆔 Tutor ID:</span>
                <span className="font-mono text-gray-500 dark:text-gray-400 text-[10px]">
                  {tutorId.slice(0, 8)}...{tutorId.slice(-4)}
                </span>
              </p>
            </div>
          )}
        </CardContent>

        {/* ============================== */}
        {/* কার্ড ফুটার — বুকিং কনফার্ম বাটন */}
        {/* ============================== */}
        <CardFooter className="pt-2 pb-6">
          {/* বুকিং বাটন — দিন ও স্লট সিলেক্ট না হলে ডিজেবল থাকবে */}
          <Button
            onClick={handleBooking}
            disabled={isLoading || !selectedDay || !selectedSlot}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* লোডিং হলে স্পিনার দেখাও, না হলে টেক্সট */}
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Booking
              </span>
            ) : (
              "✅ Confirm Booking"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

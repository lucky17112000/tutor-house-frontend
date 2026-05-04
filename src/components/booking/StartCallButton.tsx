"use client";
import { useRouter } from "next/navigation";

export default function StartCallButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/call/${bookingId}?role=tutor`)}
      className="w-full mt-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150"
    >
      📹 Start Call
    </button>
  );
}

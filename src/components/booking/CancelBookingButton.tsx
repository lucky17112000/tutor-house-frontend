"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cancelSt } from "@/actions/signin.actions";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const result = await cancelSt(bookingId);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Booking cancelled successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isLoading}
      className="w-full mt-3 px-4 py-2 border-2 border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
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
          Cancelling...
        </span>
      ) : (
        "❌ Cancel"
      )}
    </button>
  );
}

"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminCancelSt } from "@/actions/signin.actions";

interface AdminCancelAllButtonProps {
  bookingIds: string[];
}

export default function AdminCancelAllButton({
  bookingIds,
}: AdminCancelAllButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (bookingIds.length === 0) return null;

  const handleCancelAll = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel ${bookingIds.length} booking(s)?`,
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      let successCount = 0;
      let failCount = 0;

      for (const id of bookingIds) {
        const result = await adminCancelSt();
        if (result?.error) {
          failCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} booking(s) cancelled successfully!`);
      }
      if (failCount > 0) {
        toast.error(`${failCount} booking(s) failed to cancel.`);
      }

      router.refresh();
    } catch (error) {
      console.error("Cancel all error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancelAll}
      disabled={isLoading}
      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Cancelling...
        </span>
      ) : (
        `🗑️ Cancel All Cancelled Bookings (${bookingIds.length})`
      )}
    </button>
  );
}

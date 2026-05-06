"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteBookingSt } from "@/actions/signin.actions";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  bookingId: string;
  studentName: string;
}

export default function AdminDeleteBookingButton({ bookingId, studentName }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete booking for "${studentName}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await deleteBookingSt(bookingId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Booking deleted.");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 border border-red-100 dark:border-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <Loader2 className="size-3 animate-spin" />
      ) : (
        <Trash2 className="size-3" />
      )}
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}

import { getAllBookings } from "@/service/admin";
import AdminCancelAllButton from "@/components/booking/AdminCancelAllButton";
import React from "react";

export const dynamic = "force-dynamic";

const AdminBookingManage = async () => {
  const result = await getAllBookings();

  if (!result || result.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          ❌ {result?.error || "Booking data not found!"}
        </p>
      </div>
    );
  }

  const bookings = Array.isArray(result) ? result : (result?.data ?? []);

  // Collect IDs of CANCELLED bookings for the cancel-all button
  const cancelledIds = bookings
    .filter((b: any) => (b.status ?? "").toUpperCase() === "CANCELLED")
    .map((b: any) => b.id);

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    CONFIRMED: "bg-green-100 text-green-700 border-green-300",
    CANCELLED: "bg-red-100 text-red-700 border-red-300",
    COMPLETED: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
        📋 All Bookings (Admin)
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg">No Bookings Found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking: any, index: number) => {
              const studentName =
                booking.student?.name ??
                booking.user?.name ??
                "Unknown Student";
              const tutorName = booking.tutor?.name ?? "Unknown Tutor";
              const status = (booking.status ?? "PENDING").toUpperCase();
              const statusStyle =
                statusColors[status] ??
                "bg-gray-100 text-gray-700 border-gray-300";

              return (
                <div
                  key={booking.id ?? index}
                  className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-zinc-700"
                >
                  {/* Header */}
                  <div className="p-5 border-b border-gray-100 dark:border-zinc-700 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {studentName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">Student</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyle}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    {/* Tutor */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        👨‍🏫 Tutor
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {tutorName}
                      </span>
                    </div>

                    {/* Date */}
                    {booking.sessionDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          📆 Date
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {new Date(booking.sessionDate).toLocaleDateString(
                            "en-BD",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    )}

                    {/* Start Time */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        🕐 Start
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {new Date(booking.startTime).toLocaleTimeString(
                          "en-BD",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </span>
                    </div>

                    {/* End Time */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        🕑 End
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {new Date(booking.endTime).toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-600 to-transparent" />

                    {/* Price */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        💰 Price
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                        ৳{booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer — Cancel All Cancelled Bookings */}
          <div className="mt-10 flex justify-center border-t border-gray-200 dark:border-zinc-700 pt-8">
            <AdminCancelAllButton bookingIds={cancelledIds} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookingManage;

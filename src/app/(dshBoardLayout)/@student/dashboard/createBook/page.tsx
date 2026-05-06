import { getStudentBookings } from "@/service/booking";
import CancelBookingButton from "@/components/booking/CancelBookingButton";
import React from "react";

const StudentBookings = async () => {
  const result = await getStudentBookings();

  // এরর চেক — যদি ডেটা না আসে বা এরর থাকে
  if (!result || result.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          ❌ {result?.error || "বুকিং ডেটা পাওয়া যায়নি!"}
        </p>
      </div>
    );
  }

  // result অ্যারে কিনা চেক — নিরাপদে map করার জন্য
  const bookings = Array.isArray(result) ? result : (result?.data ?? []);
  // console.log("📊 Student bookings fetched:", bookings); // ✅ ডিবাগ ল  গ

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
        📚 My All Bookings
      </h1>

      {/* বুকিং না থাকলে খালি মেসেজ */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg">No BOOKing Available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {bookings.map((booking: any, index: number) => {
            const tutorName = booking.tutor?.name ?? "Unknown Tutor";
            const hourlyRate = booking.tutor?.hourlyRate ?? 0;
            const status = booking.status ?? "PENDING";

            const statusColors: Record<string, string> = {
              PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
              CONFIRMED: "bg-green-100 text-green-700 border-green-300",
              CANCELLED: "bg-red-100 text-red-700 border-red-300",
              COMPLETED: "bg-blue-100 text-blue-700 border-blue-300",
            };
            const statusStyle =
              statusColors[status.toUpperCase()] ??
              "bg-gray-100 text-gray-700 border-gray-300";

            return (
              <div
                key={booking.id ?? index}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-zinc-700"
              >
                <div className="p-5 border-b border-gray-100 dark:border-zinc-700 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {tutorName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ৳{hourlyRate}/hour
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyle}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="p-5 space-y-3">
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

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      🕐 Start
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      {new Date(booking.startTime).toLocaleTimeString("en-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

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

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      💰 Price
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                      ৳{booking.price}
                    </span>
                  </div>

                  {status.toUpperCase() !== "COMPLETED" &&
                    status.toUpperCase() !== "CANCELLED" && (
                      <CancelBookingButton bookingId={booking.id} />
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentBookings;

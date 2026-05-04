import Image from "next/image";
import Link from "next/link";
import { getStudentBookings } from "@/service/booking";
import LeaveReviewButton from "@/components/review/LeaveReviewButton";

export const dynamic = "force-dynamic";

const TUTOR_IMAGES = [
  "/images/photo-1554475901-4538ddfbccc2.avif",
  "/images/photo-1565022536102-f7645c84354a.avif",
  "/images/photo-1649180556628-9ba704115795.avif",
  "/images/premium_photo-1661715935533-507e796866e5.avif",
];

function pickImage(index: number) {
  return TUTOR_IMAGES[index % TUTOR_IMAGES.length];
}

export default async function StudentMyTutorPage() {
  const result = await getStudentBookings();
  const bookings: any[] = Array.isArray(result)
    ? result
    : (result?.data ?? result?.bookings ?? []);

  // Group bookings by tutor for the tutor cards
  const tutorMap = new Map<string, { tutor: any; imageIndex: number; bookings: any[] }>();

  bookings.forEach((booking: any) => {
    const tutorFromBooking =
      booking?.tutor ?? booking?.tutorProfile ?? booking?.course?.tutor ?? null;

    const tutorId =
      tutorFromBooking?.id ??
      tutorFromBooking?.userId ??
      booking?.tutorId ??
      booking?.tutor?.id ??
      booking?.tutorProfile?.id;

    if (!tutorId) return;

    if (!tutorMap.has(tutorId)) {
      tutorMap.set(tutorId, {
        imageIndex: tutorMap.size,
        tutor: {
          id: tutorId,
          name:
            tutorFromBooking?.name ??
            tutorFromBooking?.user?.name ??
            booking?.tutorName ??
            "Tutor",
          bio:
            tutorFromBooking?.bio ??
            booking?.tutorBio ??
            "Available for personalized sessions tailored to your goals.",
          experience:
            tutorFromBooking?.experience ?? booking?.tutorExperience ?? "1 year",
          hourlyRate:
            tutorFromBooking?.hourlyRate ??
            booking?.hourlyRate ??
            booking?.price ??
            0,
          rating: tutorFromBooking?.rating ?? booking?.rating ?? 0,
          category:
            tutorFromBooking?.category?.name ??
            booking?.category?.name ??
            "General",
        },
        bookings: [],
      });
    }
    tutorMap.get(tutorId)!.bookings.push(booking);
  });

  const tutorEntries = Array.from(tutorMap.values());

  // Collect confirmed bookings across all tutors for the "Join Call" section
  const confirmedBookings = bookings.filter(
    (b: any) => (b.status ?? "").toUpperCase() === "COMPLETED",
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Active Sessions — join call */}
        {confirmedBookings.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              🎓 Completed Sessions — Join Call
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {confirmedBookings.map((booking: any) => {
                const tutorName =
                  booking?.tutor?.name ??
                  booking?.tutorProfile?.name ??
                  booking?.tutorName ??
                  "Tutor";
                return (
                  <div
                    key={booking.id}
                    className="bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-800 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">{tutorName}</p>
                        {booking.sessionDate && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {new Date(booking.sessionDate).toLocaleDateString("en-BD", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300">
                        COMPLETED
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>
                        🕐{" "}
                        {new Date(booking.startTime).toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>
                        🕑{" "}
                        {new Date(booking.endTime).toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <Link
                      href={`/call/${booking.id}?role=student`}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150"
                    >
                      📹 Join Call
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* My Tutors section */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400 font-semibold">
                My Tutors
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em]">
                Tutors you have learned with
              </h1>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-2xl">
                This list is built from your bookings. Review tutors, reach out
                again, and keep momentum.
              </p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Total tutors:{" "}
              <span className="font-semibold">{tutorEntries.length}</span>
            </div>
          </div>

          {tutorEntries.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">
              <div className="text-4xl mb-3">📚</div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                No tutors yet
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Book a session and your tutors will show up here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tutorEntries.map(({ tutor, imageIndex }) => (
                <div
                  key={tutor.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={pickImage(imageIndex)}
                      alt={tutor.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 text-[11px] uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                      {tutor.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {tutor.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {tutor.bio}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl px-4 py-3">
                        <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                          Experience
                        </div>
                        <div className="font-semibold text-zinc-900 dark:text-white">
                          {tutor.experience}
                        </div>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl px-4 py-3">
                        <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                          Rate
                        </div>
                        <div className="font-semibold text-zinc-900 dark:text-white">
                          ৳{tutor.hourlyRate || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Rating:{" "}
                        <span className="font-semibold">{tutor.rating}</span>
                      </div>
                      <LeaveReviewButton
                        tutorId={tutor.id}
                        tutorName={tutor.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

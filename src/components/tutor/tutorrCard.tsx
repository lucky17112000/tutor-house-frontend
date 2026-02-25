import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type TutorCardProps = {
  id: string;
  image: string;
  name: string;
  bio: string;
  rating: number;
  hourlyRate: number;
};

const DEFAULT_IMAGE = "/images/istockphoto-2247792230-2048x2048.webp";

export default function TutorCard({ tutor }: { tutor: any }) {
  const clampedRating = Math.min(5, Math.max(0, tutor.rating ?? 0));
  const fullStars = Math.floor(clampedRating);
  const halfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const tutorId = tutor.id ?? tutor.id;

  if (!tutorId) {
    console.error("Tutor ID is missing:", tutor);
  }

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-md hover:shadow-2xl transition-shadow duration-300 w-72">
      {/* Image area */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={
            tutor.image && tutor.image.trim() !== ""
              ? tutor.image
              : DEFAULT_IMAGE
          }
          alt={tutor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hourly rate badge */}
        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          ${tutor.hourlyRate ?? 0}/hr
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Name */}
        <h3 className="text-xl font-bold text-zinc-800 dark:text-white truncate">
          {tutor.name}
        </h3>

        {/* Bio */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
          {tutor.bio ?? tutor.description ?? "No description available"}
        </p>

        {/* Divider */}
        <div className="border-t border-zinc-100 dark:border-zinc-700" />

        {/* Rating row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star
                key={`full-${i}`}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
            {/* Half star */}
            {halfStar && (
              <span className="relative inline-block w-4 h-4">
                <Star
                  size={16}
                  className="text-zinc-300 fill-zinc-300 absolute inset-0"
                />
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                </span>
              </span>
            )}
            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star
                key={`empty-${i}`}
                size={16}
                className="text-zinc-300 fill-zinc-300"
              />
            ))}
            <span className="ml-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {clampedRating.toFixed(1)}
            </span>
          </div>

          {/* CTA button */}
          {tutorId ? (
            <Link
              href={`/tutor/${tutorId}`}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition"
            >
              View Detailes →
            </Link>
          ) : (
            <span className="text-sm font-semibold text-gray-400">
              No details available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

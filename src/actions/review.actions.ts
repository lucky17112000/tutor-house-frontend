"use server";

import { getReviewsByTutorId, leaveRevview } from "@/service/booking";

export async function leaveReviewAction(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const ratingRaw = String(formData.get("rating") ?? "");
  const comment = String(formData.get("comment") ?? "");
  const rating = Number.parseInt(ratingRaw, 10);

  if (!tutorId || Number.isNaN(rating)) {
    return { error: "Missing tutor or rating." };
  }

  return leaveRevview(tutorId, rating, comment);
}

export async function getReviewsByTutorIdAction(tutorId: string) {
  const res = await getReviewsByTutorId(tutorId);
  // Normalise — API wraps in result / data / reviews or returns array directly
  if (Array.isArray(res))         return res;
  if (Array.isArray(res?.result)) return res.result;
  if (Array.isArray(res?.data))   return res.data;
  if (Array.isArray(res?.reviews))return res.reviews;
  // Single object wrapped — unwrap one more level
  const inner = res?.result ?? res?.data ?? res?.reviews;
  if (Array.isArray(inner)) return inner;
  return [];
}

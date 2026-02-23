// ========================================================
// টিউটর বুকিং পেজ — সার্ভার কম্পোনেন্ট
// এই পেজে URL থেকে টিউটরের ID নিয়ে সার্ভার থেকে ডেটা
// ফেচ করা হয় এবং সেই ডেটা দিয়ে BookingCard রেন্ডার করা হয়
// ========================================================

import { getSingleTutor } from "@/service/tutor/user.services";
import BookingCard from "@/components/booking/BookingCard";
import React from "react";

const TutorBookpage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const res = await getSingleTutor(id);

  const tutor = res?.result;

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          Tutor not found. Please check the ID and try again.
        </p>
      </div>
    );
  }

  return <BookingCard tutor={tutor} tutorId={id} />;
};

export default TutorBookpage;

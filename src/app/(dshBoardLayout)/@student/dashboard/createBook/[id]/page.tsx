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

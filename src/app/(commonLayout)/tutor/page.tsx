import PaginationControles from "@/components/shared/pagination/paginationControles";
import TutorCard from "@/components/tutor/tutorrCard";
import { authClient } from "@/lib/auth-client";
// import { userService } from "@/service/auth";

import { getAllTutors } from "@/service/tutor/user.services";

import React, { Suspense } from "react";

const TutorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const res = await getAllTutors(currentPage);

  const tutors = res?.data ?? res ?? [];

  const pagination = res?.pagination;

  return (
    <div className="min-h-screen pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {tutors.map((tutor: any) => (
          <TutorCard key={tutor.id ?? tutor.id} tutor={tutor} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 py-3">
        <Suspense fallback={<div className="text-center py-2">Loading...</div>}>
          <PaginationControles meta={pagination} />
        </Suspense>
      </div>
    </div>
  );
};

export default TutorPage;

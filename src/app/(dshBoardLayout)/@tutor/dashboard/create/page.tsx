import TutorCreateForm from "@/components/tutor/TutorCreateForm";
// import { useSearchParams } from "next/navigation";
import React from "react";

const CreateTutorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ categoryId: string }>;
}) => {
  // const searchParams = useSearchParams();
  // const categoryId = searchParams.get("categoryId");
  // console.log("Category ID from URL:", categoryId);
  const { categoryId } = await searchParams;
  // console.log(categoryId);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
      <TutorCreateForm id={categoryId} />
    </div>
  );
};

export default CreateTutorPage;

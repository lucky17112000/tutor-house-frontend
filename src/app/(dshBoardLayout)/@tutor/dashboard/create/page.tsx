import TutorCreateForm from "@/components/tutor/TutorCreateForm";
<<<<<<< HEAD
import { getCategories } from "@/service/admin";

interface Category {
  id: string;
  name: string;
  description?: string;
}
=======
// import { useSearchParams } from "next/navigation";
import React from "react";
>>>>>>> afa85866013a6a9d91e24184f725ac3f34268be9

const CreateTutorPage = async ({
  searchParams,
}: {
<<<<<<< HEAD
  searchParams: Promise<{ categoryId?: string }>;
}) => {
  const { categoryId } = await searchParams;

  const res = await getCategories();
  const categories: Category[] = Array.isArray(res)
    ? res
    : Array.isArray(res?.data)
      ? res.data
      : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <TutorCreateForm initialCategoryId={categoryId ?? ""} categories={categories} />
=======
  searchParams: Promise<{ categoryId: string }>;
}) => {
  // const searchParams = useSearchParams();
  // const categoryId = searchParams.get("categoryId");
  // console.log("Category ID from URL:", categoryId);
  const { categoryId } = await searchParams;
  console.log("Category ID from URL:", categoryId);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
      <TutorCreateForm id={categoryId} />
>>>>>>> afa85866013a6a9d91e24184f725ac3f34268be9
    </div>
  );
};

export default CreateTutorPage;

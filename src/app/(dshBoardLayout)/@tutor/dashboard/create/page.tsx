import TutorCreateForm from "@/components/tutor/TutorCreateForm";
import { getCategories } from "@/service/admin";

interface Category {
  id: string;
  name: string;
  description?: string;
}

const CreateTutorPage = async ({
  searchParams,
}: {
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
    </div>
  );
};

export default CreateTutorPage;

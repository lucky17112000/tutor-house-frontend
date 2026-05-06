import Review from "@/components/review/Review";
import { getAllReviews } from "@/service/booking";

export const dynamic = "force-dynamic";

const ReviewPage = async () => {
  const result = await getAllReviews();
  const reviews = Array.isArray(result)
    ? result
    : (result?.data ?? result?.reviews ?? []);

  return <Review reviews={reviews} />;
};

export default ReviewPage;

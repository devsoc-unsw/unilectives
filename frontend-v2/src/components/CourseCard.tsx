import StarRating from "./StarRating";
import TermsGroup from "./TermsGroup";

// Type for the course card component
type CourseCardProps = {
  courseCode: string;
  title: string;
  rating: number;
  reviewCount: number;
  terms: number[];
};

// Course card component
export default function CourseCard({
  courseCode,
  title,
  rating,
  reviewCount,
  terms,
}: CourseCardProps) {
  return (
    <div className="box-border px-6 py-7 bg-unilectives-card shadow-card rounded-xl space-y-2 cursor-pointer">
      {/* Course courseCode + Ratings */}
      <div className="flex flex-wrap justify-between text-2xl">
        <h1 className="font-bold">{courseCode}</h1>
        <div>
          {/* StarRating */}
          <StarRating rating={rating} />
          {/* Number of reviews */}
          <p className="text-xs text-unilectives-subheadings">
            {/* Format number to their abbreviated string e.g 1000 to 1k, or 1000000 to 1M */}
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(reviewCount)}{" "}
            reviews
          </p>
        </div>
      </div>
      {/* Course title */}
      <p className="text-sm text-unilectives-headings h-16 break-all line-clamp-3">
        {title}
      </p>
      {/* Terms */}
      <TermsGroup terms={terms} />
    </div>
  );
}

import Rating from "../Rating/Rating";
import TermsGroup from "../TermsGroup/TermsGroup";

// Type for the course card component
type CourseCardProps = {
  courseCode: string;
  title: string;
  overallRating: number;
  reviewCount: number;
  terms: number[];
};

// Course card component
export default function CourseCard({
  courseCode,
  title,
  overallRating,
  reviewCount,
  terms,
}: CourseCardProps) {
  return (
    <div className="box-border px-6 py-7 bg-unilectives-card hover:bg-gray-100 shadow-lg rounded-xl space-y-2 cursor-pointer">
      {/* Course courseCode + Ratings */}
      <div className="flex flex-wrap justify-between text-2xl">
        <h1 className="font-bold">{courseCode}</h1>
        <div className="text-right">
          {/* StarRating */}
          <div className="text-2xl inline">
            <Rating color="purple" type="star" overallRating={overallRating} />
          </div>
          {/* Number of reviews */}
          <p className="text-xs text-unilectives-subheadings">
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
      <TermsGroup
        className="text-xs py-1 px-2 rounded-full bg-unilectives-tags"
        terms={terms}
      />
    </div>
  );
}

import TermsGroup from "./TermsGroup";

// Type for the course card component
type CourseCardProps = {
  code: string;
  name: string;
  rating: number;
  numReviews: number;
  terms: number[];
};

// Course card component
export default function CourseCard({
  code,
  name,
  rating,
  numReviews,
  terms,
}: CourseCardProps) {
  const percentage = parseFloat((((rating > 5 ? 5 : rating) / 5) * 100).toFixed(1));

  return (
    <div className="box-border p-6 bg-unilectives-card hover:bg-gray-100 shadow-lg rounded-xl space-y-2 cursor-pointer">
      <div className="flex flex-wrap justify-between text-2xl">
        <h1 className="font-bold">{code}</h1>
        <div className="relative text-2xl text-right text-unilectives-subheadings/30">
          <span aria-label="rating">★★★★★</span>
          <span
            className="absolute inset-0 bg-unilectives-purple text-transparent bg-clip-text"
            style={{ width: `${percentage}%` }}
            aria-hidden={true}
          >
            ★★★★★
          </span>
          <p className="text-xs text-unilectives-subheadings">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(numReviews)}{" "}
            reviews
          </p>
        </div>
      </div>
      <p className="text-sm text-unilectives-headings h-16 break-all line-clamp-3">
        {name}
      </p>
      {/* Terms */}
      <TermsGroup
        className="text-xs py-1 px-2 rounded-full bg-unilectives-tags"
        terms={terms}
      />
    </div>
  );
}

// Type for the course card component
type CourseCardProps = {
  code: string;
  name: string;
  rating: number;
  numReviews: number;
  terms?: {
    summer?: boolean;
    term1?: boolean;
    term2?: boolean;
    term3?: boolean;
  };
};

// Course card component
export default function CourseCard({
  code,
  name,
  rating,
  numReviews,
  terms,
}: CourseCardProps) {
  // Convert percentage to 1 decimal float
  const percentage = parseFloat(
    (((rating > 5 ? 5 : rating) / 5) * 100).toFixed(1)
  );

  return (
    <div className="xxs:w-[200px] box-border px-6 py-7 bg-unilectives-card shadow-card rounded-xl space-y-2 cursor-pointer">
      {/* Course code + Ratings */}
      <div className="flex flex-wrap justify-between text-2xl">
        {/* Rating */}
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
          {/* Number of reviews */}
          <p className="text-xs text-unilectives-subheadings">
            {/* Format number to their abbreviated string e.g 1000 to 1k, or 1000000 to 1M */}
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(numReviews)}{" "}
            reviews
          </p>
        </div>
      </div>
      {/* Course name */}
      <p className="text-sm text-unilectives-headings h-16 break-all line-clamp-3">
        {name}
      </p>
      {/* Terms */}
      <div className="flex flex-wrap gap-2">
        {terms && terms.summer && (
          <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
            Summer
          </span>
        )}
        {terms && terms.term1 && (
          <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
            Term 1
          </span>
        )}
        {terms && terms.term2 && (
          <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
            Term 2
          </span>
        )}
        {terms && terms.term3 && (
          <span className="bg-unilectives-tags text-xs py-1 px-2 rounded-full">
            Term 3
          </span>
        )}
      </div>
    </div>
  );
}
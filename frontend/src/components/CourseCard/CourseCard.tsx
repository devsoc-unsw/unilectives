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
    <div className='box-border px-6 py-7 bg-unilectives-card dark:bg-slate-700/40 hover:bg-gray-100 dark:hover:bg-slate-700/10 shadow-lg rounded-xl space-y-2 cursor-pointer duration-150'>
      {/* Course courseCode + Ratings */}
      <div className='flex flex-wrap justify-between text-2xl gap-x-4'>
        <h2 className='font-bold w-[8ch] text-black dark:text-white'>
          {courseCode}
        </h2>
        <div className='text-left'>
          {/* StarRating */}
          <div className='text-2xl inline'>
            <Rating color='purple' type='star' overallRating={overallRating} />
          </div>
          {/* Number of reviews */}
          <p className='text-xs text-unilectives-subheadings dark:text-gray-400'>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(reviewCount)}{" "}
            reviews
          </p>
        </div>
      </div>
      {/* Course title */}
      <p className='text-sm text-unilectives-headings dark:text-gray-200 h-16 line-clamp-3'>
        {title}
      </p>
      {/* Terms */}
      <TermsGroup
        className='text-xs py-1 px-2 rounded-full bg-unilectives-tags dark:bg-unilectives-blue'
        terms={terms}
      />
    </div>
  );
}

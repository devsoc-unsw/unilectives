interface CourseCardProps {
  code: string;
  name: string;
  rating: number;
  reviews: number;
  terms: {
    summer?: boolean;
    term1?: boolean;
    term2?: boolean;
    term3?: boolean;
  };
}

const CourseCard = ({
  code,
  name,
  rating,
  reviews,
  terms,
}: CourseCardProps) => {
  // Convert percentage to 1 decimal float
  const percentage = parseFloat(((rating / 5) * 100).toFixed(1));

  return (
    <div className='box-border px-6 py-7 bg-unilectives-card shadow-card rounded-xl space-y-2'>
      {/* Course code + Ratings */}
      <div className='flex flex-wrap justify-between'>
        <h1 className='text-2xl font-bold'>{code}</h1>
        {/* Rating */}
        <div className='text-2xl relative text-right'>
          <span className='text-unilectives-subheadings'>★★★★★</span>
          <span
            className='absolute inset-0 bg-unilectives-purple text-transparent bg-clip-text'
            style={{ width: `${percentage}%` }}
          >
            ★★★★★
          </span>
          <p className='text-xs text-unilectives-subheadings'>
            {/* Format number to their abbreviated string e.g 1000 to 1k, or 1000000 to 1M */}
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(reviews)}{' '}
            reviews
          </p>
        </div>
      </div>
      {/* Course name */}
      <p className='text-sm text-unilectives-headings h-16 break-all line-clamp-3'>
        {name}
      </p>
      {/* Terms */}
      <div className='flex flex-wrap gap-2'>
        {terms.summer && (
          <div className='bg-unilectives-tags text-xs py-1 px-2 rounded-full'>
            Summer
          </div>
        )}
        {terms.term1 && (
          <div className='bg-unilectives-tags text-xs py-1 px-2 rounded-full'>
            Term 1
          </div>
        )}
        {terms.term2 && (
          <div className='bg-unilectives-tags text-xs py-1 px-2 rounded-full'>
            Term 2
          </div>
        )}
        {terms.term3 && (
          <div className='bg-unilectives-tags text-xs py-1 px-2 rounded-full'>
            Term 3
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

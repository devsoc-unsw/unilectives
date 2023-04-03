const CourseCard = () => {
  const rating = 3.5;
  // Convert percentage to 1 decimal float
  const percentage = parseFloat(((rating / 5) * 100).toFixed(1));

  return (
    <div className="flex flex-col justify-between h-44 w-80 box-border p-6 bg-white shadow-lg rounded-lg">
      {/* Upper section */}
      <div className="flex flex-col gap-1">
        {/* Course code + Ratings */}
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-semibold">COMP1521</h1>
          <div>
            {/* Rating */}
            <div className="text-2xl relative">
              <span className="text-gray-400">★★★★★</span>
              <span className={`absolute inset-0 bg-purple-400 text-transparent bg-clip-text ${percentage && `w-[${percentage}%]`}`}>★★★★★</span>
            </div>
            <p className="text-right text-xs text-gray-400">31 reviews</p>
          </div>
        </div>
        {/* Course name */}
        <p className="text-sm">Computer System Fundamentals</p>
      </div>
      {/* Bottom section */}
      <div className="flex gap-2">
        {/* Term */}
        <span className="bg-cyan-100 py-1 px-2 rounded-full">Term 1</span>
        <span className="bg-cyan-100 py-1 px-2 rounded-full">Term 2</span>
        <span className="bg-cyan-100 py-1 px-2 rounded-full">Term 3</span>
      </div>
    </div>
  );
}

export default CourseCard;
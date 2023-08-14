export default function DoughnutChart({
  overallRating,
  width,
  strokeWidth,
}: {
  overallRating: number;
  width: number;
  strokeWidth: number;
}) {
  // Convert percentage to 1 decimal float
  const percentage =
    overallRating && overallRating !== -1
      ? parseFloat(
          (((overallRating > 5 ? 5 : overallRating) / 5) * 100).toFixed(1)
        )
      : 0;

  // Get radius, dasharray and dashoffset values
  const radius = width / 2 - strokeWidth;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="flex relative flex-col justify-center w-fit items-center">
      <svg
        className="-scale-x-100"
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
      >
        <circle
          className="fill-none stroke-unilectives-purple/20"
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="fill-none stroke-unilectives-purple"
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${width / 2} ${width / 2})`}
        ></circle>
      </svg>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        <span className="text-2xl font-bold">
          {overallRating ? overallRating.toFixed(1) : 0}
        </span>
        <span className="text-sm font-bold text-black/50">/ 5</span>
      </span>
    </div>
  );
}

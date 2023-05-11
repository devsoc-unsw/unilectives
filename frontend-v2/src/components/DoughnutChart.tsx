export default function DoughnutChart({
  label,
  rating,
}: {
  label: string;
  rating: number;
}) {
  // Convert percentage to 1 decimal float
  const percentage = parseFloat(
    (((rating > 5 ? 5 : rating) / 5) * 100).toFixed(1)
  );

  console.log(Math.round((percentage / 100) * 440));

  return (
    <div className="flex flex-col justify-center items-center">
      <svg viewBox="0 0 100 100" width={90} height={90}>
        <circle
          className="fill-none stroke-unilectives-purple stroke-[10]"
          cx="40"
          cy="40"
          r="40"
        ></circle>
        <circle
          className="fill-none stroke-unilectives-purple stroke-[10]"
          cx="40"
          cy="40"
          r="40"
        ></circle>
      </svg>
      <span className="absolute">{rating.toFixed(1)} / 5</span>
    </div>
  );
}

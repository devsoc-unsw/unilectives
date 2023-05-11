export default function Rating({ rating }: { rating: number }) {
  // Convert percentage to 1 decimal float
  const percentage = parseFloat(
    (((rating > 5 ? 5 : rating) / 5) * 100).toFixed(1)
  );

  return (
    <div className="relative text-2xl text-unilectives-subheadings/30 inline-block">
      <span aria-label="rating">★★★★★</span>
      <span
        className="absolute inset-0 bg-unilectives-purple text-transparent bg-clip-text"
        style={{ width: `${percentage}%` }}
        aria-hidden={true}
      >
        ★★★★★
      </span>
    </div>
  );
}

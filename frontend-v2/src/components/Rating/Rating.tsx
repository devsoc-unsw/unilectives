export default function Rating({
  color,
  type,
  rating,
}: {
  type: "star" | "circle";
  color: "blue" | "purple";
  rating: number;
}) {
  // Convert percentage to 1 decimal float
  const percentage =
    rating && rating !== -1
      ? parseFloat((((rating > 5 ? 5 : rating) / 5) * 100).toFixed(1))
      : 0;

  const content = (type === "star" ? "★" : "●").repeat(5);

  return (
    <div className="relative text-unilectives-subheadings/30 inline-block">
      <span aria-label="rating">{content}</span>
      <span
        className={`${
          color === "blue" ? "bg-unilectives-blue" : "bg-unilectives-purple"
        } absolute inset-0 text-transparent bg-clip-text select-none`}
        style={{ width: percentage }}
        aria-hidden={true}
      >
        {content}
      </span>
    </div>
  );
}

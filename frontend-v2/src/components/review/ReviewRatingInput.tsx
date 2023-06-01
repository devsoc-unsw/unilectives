"use client";

import { MouseEvent, useCallback, useState } from "react";

export default function ReviewRatingInput({
  color,
  type,
  defaultValue,
  onChange,
}: {
  color: "blue" | "purple";
  type: "star" | "circle";
  defaultValue: number | null;
  onChange: (value: number) => void;
}) {
  // States
  const [rating, setRating] = useState(defaultValue || null);

  // Constants
  const max = 5;

  // Function handler when user changes the rating on click
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      const target = event.target as HTMLSpanElement;
      const targetRating = Number(target.getAttribute("data-rating"));

      if (onChange) {
        onChange(targetRating);
      }
      setRating(targetRating);

      return targetRating;
    },
    [onChange]
  );

  return (
    <div className="inline-block">
      {Array(max)
        .fill(type === "star" ? "★" : "●")
        .map((content: string, index: number) => (
          <button
            type="button"
            data-rating={max - index}
            key={max - index}
            onClick={handleOnClick}
            className={`inline-block float-right cursor-pointer transition-all duration-200
            ${
              color === "blue"
                ? "hover:text-unilectives-blue [&~button]:hover:text-unilectives-blue"
                : "hover:text-unilectives-purple [&~button]:hover:text-unilectives-purple"
            }
            ${
              rating && max - index <= rating
                ? color === "blue"
                  ? "text-unilectives-blue"
                  : "text-unilectives-purple"
                : color === "blue"
                ? "text-unilectives-blue/25"
                : "text-unilectives-purple/25"
            }`}
            title={`Rating ${max - index}`}
          >
            <span className="sr-only">{index + 1} star(s)</span>
            {content}
          </button>
        ))}
    </div>
  );
}

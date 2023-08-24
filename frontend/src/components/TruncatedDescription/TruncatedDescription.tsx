"use client";

import { useState } from "react";

export default function TruncatedDescription({
  content,
  maxCharacters,
}: {
  content: string;
  maxCharacters: number;
}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const shortenedContent =
    content.length < maxCharacters
      ? content
      : `${content.slice(0, maxCharacters)}...`;

  return (
    <div>
      <p className="whitespace-pre-line break-all inline">
        {showFullContent ? content : shortenedContent}{" "}
      </p>
      {content.length > maxCharacters && (
        <button
          className="text-unilectives-blue hover:underline"
          onClick={() => setShowFullContent((prev) => !prev)}
        >
          {showFullContent ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

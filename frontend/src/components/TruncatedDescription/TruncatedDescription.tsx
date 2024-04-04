"use client";

import { useEffect, useState } from "react";

export default function TruncatedDescription({
  content,
  maxCharacters,
}: {
  content: string;
  maxCharacters: number;
}) {
  
  const [showFullContent, setShowFullContent] = useState(false);
  const [dynamicCutOffPoint, setDynamicCutOffPoint] = useState(maxCharacters);
  const [shortenedContent, setShortenedContent] = useState("");
  // const shortenedContent =
  //   content.length < maxCharacters
  //     ? content
  //     : `${content.slice(0, maxCharacters)}...`;

  useEffect(() => {
    if (content.length > maxCharacters) {
      let newMax = maxCharacters;
      let index = newMax - 1;
      while (true) {
        if (content[index] === ' ' || index === content.length) {
          newMax = index;
          break;
        }
        newMax++;
        index++;
      }
      setShortenedContent(content.slice(0, newMax) + '...');
    } else {
      setShortenedContent(content);
    }
  }, [])

  return (
    <div>
      <p className="whitespace-pre-line text-justify inline">
        {showFullContent ? content : shortenedContent}{" "}
      </p>
      <div className="mt-1">
        {content.length > maxCharacters && (
          <button
            className="text-unilectives-blue hover:underline"
            onClick={() => setShowFullContent((prev) => !prev)}
          >
            {showFullContent ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
}

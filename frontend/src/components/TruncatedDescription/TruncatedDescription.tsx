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
  const [exceed, setExceed] = useState(false);
  const [shortenedContent, setShortenedContent] = useState(" ");

  /**
   * If the content exceeds the maxCharacters, find the next whitespace
   * and make the cutoff point there so the break does not happen mid-word
   *
   * If the new cutoff point is the end of the entire content, make it so
   * the See More/Less button does not appear
   */
  useEffect(() => {
    if (content.length > maxCharacters) {
      // Description exceeds max characters
      setShowFullContent(false);
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

      if (index === content.length) {
        setShortenedContent(content);
      } else {
        setExceed(true);
        setShortenedContent(content.slice(0, newMax) + '...');
      }
    } else {
      // Description length is less than maxCharacters
      setShowFullContent(true);
      setExceed(false);
      setShortenedContent(content);
    }
  }, [content])

  return (
    <div className="break-words">
      <p className="whitespace-pre-line text-left">
        {showFullContent ? content : shortenedContent}
      </p>
      <div className="mt-1">
        {exceed &&
          (
            <button
              className="text-unilectives-blue hover:underline"
              onClick={() => setShowFullContent((prev) => !prev)}
            >
              {showFullContent ? "See Less" : "See More"}
            </button>
          )
        }
      </div>
    </div>
  );
}

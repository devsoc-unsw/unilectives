"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useRef, useState } from "react";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export default function Pagination({
  itemPerPage,
  totalItems,
  onPageChange,
}: {
  itemPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  // Refs + States
  const currentPageRef = useRef(1);
  const [currentPage, setCurrentPage] = useState(currentPageRef.current);

  // Page count + neighbours
  const pageCount = useMemo(
    () => Math.ceil(totalItems / itemPerPage),
    [totalItems, itemPerPage]
  );
  const leftNeighbours = currentPageRef.current - 1;
  const rightNeighbours = useMemo(
    () => pageCount - currentPageRef.current,
    [pageCount]
  );

  // Make middle range based on page count and neighbours
  const renderMiddleRange = () => {
    const leftNeighbours = currentPageRef.current - 1;
    const rightNeighbours = pageCount - currentPageRef.current;
    if (leftNeighbours <= 3) {
      return range(2, 5);
    }
    if (rightNeighbours <= 3) {
      return range(pageCount - 4, pageCount - 1);
    }
    return range(currentPageRef.current - 1, currentPageRef.current + 1);
  };

  const changeCurrentPage = useCallback(
    (page: number) => {
      if (page < 1) {
        currentPageRef.current = 1;
      } else if (page > pageCount) {
        currentPageRef.current = pageCount;
      } else {
        currentPageRef.current = page;
      }
      setCurrentPage(currentPageRef.current);
      onPageChange(currentPageRef.current);
    },
    [currentPage]
  );

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        type="button"
        onClick={() => changeCurrentPage(currentPageRef.current - 1)}
        className="w-8 h-8 flex items-center cursor-pointer justify-center hover:bg-unilectives-purple/25 rounded-full"
      >
        <ChevronLeftIcon className="w-4 h-4 rounded-full" />
      </button>
      {pageCount <= 7 ? (
        <>
          {range(1, pageCount).map((num: number, index: number) => (
            <button
              key={index}
              type="button"
              className={`w-8 h-8 flex items-center justify-center select-none rounded-full cursor-pointer ${
                currentPage === num
                  ? "bg-unilectives-purple hover:bg-unilectives-purple/75"
                  : "hover:bg-unilectives-purple/25"
              }`}
              onClick={() => changeCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </>
      ) : (
        <>
          {/* First child */}
          <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center select-none rounded-full cursor-pointer ${
              currentPage === 1
                ? "bg-unilectives-purple hover:bg-unilectives-purple/75"
                : "hover:bg-unilectives-purple/25"
            }`}
            onClick={() => changeCurrentPage(1)}
          >
            1
          </button>
          {/* if left neighbours > 3 */}
          {leftNeighbours > 3 && (
            <span className="w-8 h-8 flex justify-center items-center">..</span>
          )}
          {/* Middle range */}
          {renderMiddleRange().map((num: number, index: number) => (
            <button
              key={index}
              type="button"
              className={`w-8 h-8 flex items-center justify-center select-none rounded-full cursor-pointer ${
                currentPage === num
                  ? "bg-unilectives-purple hover:bg-unilectives-purple/75"
                  : "hover:bg-unilectives-purple/25"
              }`}
              onClick={() => changeCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          {/* if right neighbours > 3 */}
          {rightNeighbours > 3 && (
            <span className="w-8 h-8 flex justify-center items-center">..</span>
          )}
          {/* Last child */}
          <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center select-none rounded-full cursor-pointer ${
              currentPage === pageCount
                ? "bg-unilectives-purple hover:bg-unilectives-purple/75"
                : "hover:bg-unilectives-purple/25"
            }`}
            onClick={() => changeCurrentPage(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => changeCurrentPage(currentPageRef.current + 1)}
        className="w-8 h-8 flex items-center cursor-pointer justify-center hover:bg-unilectives-purple/25 rounded-full"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

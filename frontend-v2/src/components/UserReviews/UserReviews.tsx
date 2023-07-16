"use client";

import { Review, Reviews } from "@/types/api";
import Dropdown from "../Dropdown/Dropdown";
import { useMemo, useState } from "react";
import Rating from "../Rating/Rating";
import {
  ArrowSmallUpIcon,
  BookmarkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function UserReviews({ reviews }: Reviews) {
  const [currentReviews, setCurrentReviews] = useState(reviews);
  const [selected, setSelected] = useState("");
  const [cardView, setCardView] = useState(true);

  // Change review sorting based on dropdown
  useMemo(() => {
    const sortedReviews = [...reviews];
    switch (selected) {
      case "Most Recent":
        sortedReviews.sort(
          (r1: Review, r2: Review) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r1.createdTimestamp)
        );
        break;
      case "Most Recently Taken":
        sortedReviews.sort((r1: Review, r2: Review) =>
          r2.termTaken.localeCompare(r1.termTaken)
        );
        break;
      case "Highest Rating to Lowest Rating":
        sortedReviews.sort(
          (r1: Review, r2: Review) => r2.overallRating - r1.overallRating
        );
        break;
      case "Lowest Rating to Highest Rating":
        sortedReviews.sort(
          (r1: Review, r2: Review) => r1.overallRating - r2.overallRating
        );
        break;
    }

    setCurrentReviews(
      sortedReviews.filter((r: Review) => !!(r.title || r.description))
    );
  }, [selected, reviews]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        {/* Review order */}
        <div className="min-w-[275px] max-w-[275px] sm:min-w-full [&>*]:z-10">
          <Dropdown
            options={[
              "Most Recent",
              "Most Recently Taken",
              "Highest Rating to Lowest Rating",
              "Lowest Rating to Highest Rating",
            ]}
            placeholder="Sort by"
            defaultValue={selected}
            onChange={setSelected}
          />
        </div>
        {/* Toggle Switch */}
        <div className="flex ml-auto gap-2">
          <span>Card</span>
          <div className="-scale-1">
            <ToggleSwitch
              accessibleTitle="card-list-view"
              defaultValue={cardView}
              onChange={setCardView}
            />
          </div>
          <span>List</span>
        </div>
      </div>
      {/* Reviews */}
      {/* List view */}
      {!cardView && (
        <div>
          {currentReviews.map((review: Review, index: number) => (
            <div className="flex justify-between items-center gap-2 sm:flex-wrap border border-transparent border-b-black px-4 py-4">
              <div className="flex w-1/2 sm:w-full sm:flex-col sm:items-start items-center gap-2">
                {/* Title */}
                <h1 className="font-bold text-xl">
                  {/* TODO: Change when prisma migration is done */}
                  {(review.courseCode as any).courseCode}
                </h1>
                {/* Description */}
                <p className="text-unilectives-headings w-full truncate">
                  {review.description}
                </p>
              </div>
              {/* Icons */}
              <div className="flex flex-1 flex-wrap gap-5 justify-end sm:justify-start">
                <button>
                  <ArrowSmallUpIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <BookmarkIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <PencilSquareIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <TrashIcon className="w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Card view */}
      {cardView && (
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-12">
          {currentReviews.map((review: Review, index: number) => (
            <div className="box-border isolate px-6 py-7 bg-unilectives-card shadow-lg rounded-xl space-y-4">
              {/* Course courseCode + Ratings */}
              <div className="flex flex-wrap justify-between text-2xl">
                <h1 className="font-bold block truncate">
                  {/* TODO: Change when prisma migration is done */}
                  {(review.courseCode as any).courseCode}
                </h1>
                <div className="text-right">
                  {/* StarRating */}
                  <div className="text-2xl inline">
                    <Rating
                      color="purple"
                      type="star"
                      rating={review.overallRating}
                    />
                  </div>
                </div>
              </div>
              {/* Description */}
              <p className="text-unilectives-headings break-all line-clamp-3 h-[4.5rem]">
                {review.description}
              </p>
              {/* Icons */}
              <div className="flex flex-wrap ml-auto gap-5 w-fit">
                <button>
                  <ArrowSmallUpIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <BookmarkIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <PencilSquareIcon className="w-6 h-6 inline-block" />
                </button>
                <button>
                  <TrashIcon className="w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div></div>
    </div>
  );
}

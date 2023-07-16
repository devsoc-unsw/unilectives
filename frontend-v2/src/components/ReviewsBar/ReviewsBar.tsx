"use client";

import Dropdown from "../Dropdown/Dropdown";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useMemo, useState } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Review } from "@/types/api";

export default function ReviewsBar({
  reviews,
  courseCode,
}: {
  reviews: Review[];
  courseCode: string;
}) {
  // States
  const [currentReviews, setCurrentReviews] = useState(reviews);
  const [displayTextReview, setDisplayTextReview] = useState(false);
  const [selected, setSelected] = useState("");

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

    if (!displayTextReview) {
      return setCurrentReviews(sortedReviews);
    }

    setCurrentReviews(
      sortedReviews.filter((r: Review) => !!(r.title || r.description))
    );
  }, [displayTextReview, selected, reviews]);

  return (
    <div className="space-y-5 isolate">
      {/* Heading + Dropdown + Modal */}
      <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
        <h3 className="text-2xl font-bold">Reviews</h3>
        <div className="flex-1 min-w-[275px] max-w-[275px] xs:min-w-full z-10">
          <Dropdown
            options={[
              "Most Recent",
              "Most Recently Taken",
              "Highest Rating to Lowest Rating",
              "Lowest Rating to Highest Rating",
            ]}
            defaultValue={selected}
            onChange={setSelected}
            placeholder="Sort by"
          />
        </div>
        <ReviewModal courseCode={courseCode} />
      </div>
      {/* Switch */}
      <div className="flex items-center flex-wrap gap-1">
        <ToggleSwitch
          defaultValue={displayTextReview}
          onChange={setDisplayTextReview}
          accessibleTitle="Text only reviews"
        />
        <span>Text only reviews</span>
      </div>
      {/* Reviews */}
      {currentReviews.map((review: Review, index: number) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
}

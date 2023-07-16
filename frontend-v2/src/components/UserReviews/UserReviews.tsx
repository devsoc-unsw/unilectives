"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import UserReviewCard from "../UserReviewCard/UserReviewCard";
import { Review, Reviews } from "@/types/api";

export default function UserReviews({ reviews }: Reviews) {
  // Refs
  const currentTabRef = useRef("My reviews");
  // States
  const [tabs, setTabs] = useState<{ [key: string]: boolean }>({
    "My reviews": true,
    "My reports": false,
    Bookmarked: false,
    Upvoted: false,
  });
  const [currentReviews, setCurrentReviews] = useState(reviews);
  const [selected, setSelected] = useState("");

  // Change review sorting based on dropdown
  useMemo(() => {
    const sortedReviews = [...reviews];
    switch (selected) {
      case "Most Recent":
        sortedReviews.sort(
          (r1: Review, r2: Review) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r2.createdTimestamp)
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

  // Switch tabs function
  const switchTabs = useCallback(
    (key: string) => {
      setTabs((prevTab) => {
        const newTabs = { ...prevTab };
        newTabs[currentTabRef.current] = false;
        newTabs[key] = true;
        currentTabRef.current = key;
        return newTabs;
      });
    },
    [tabs]
  );

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4">
        {Object.keys(tabs).map((key: string) => (
          <button
            key={key}
            className={`${
              tabs[key]
                ? "bg-unilectives-tags-pink text-black/50 font-bold"
                : "text-black"
            } rounded-lg py-2 duration-150 min-w-[125px]`}
            onClick={() => switchTabs(key)}
          >
            {key}
          </button>
        ))}
      </div>
      {/* Review order */}
      <div className="min-w-[275px] max-w-[275px] md:min-w-full [&>*]:z-10">
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
      {/* Reviews */}
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-12">
        {currentReviews.map((review: Review, index: number) => (
          <UserReviewCard key={index} review={review} />
        ))}
      </div>
      {/* Pagination */}
      <div></div>
    </div>
  );
}

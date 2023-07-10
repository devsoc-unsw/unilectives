"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Rating from "../Rating/Rating";
import {
  ArrowSmallUpIcon,
  BookmarkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function UserPageContent({ reviews }: { reviews: any }) {
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
          (r1: any, r2: any) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r2.createdTimestamp)
        );
        break;
      case "Most Recently Taken":
        sortedReviews.sort((r1: any, r2: any) =>
          r2.termTaken.localeCompare(r1.termTaken)
        );
        break;
      case "Highest Rating to Lowest Rating":
        sortedReviews.sort(
          (r1: any, r2: any) => r2.overallRating - r1.overallRating
        );
        break;
      case "Lowest Rating to Highest Rating":
        sortedReviews.sort(
          (r1: any, r2: any) => r1.overallRating - r2.overallRating
        );
        break;
    }

    setCurrentReviews(
      sortedReviews.filter((r: any) => !!(r.title || r.description))
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
    <section className="py-24 px-16 md:px-8 lg:py-16 space-y-5">
      {/* zId + Tabs + Sort */}
      <h1 className="font-bold text-3xl">z5696969</h1>
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
        {currentReviews.map((review: any) => (
          <div className="box-border isolate px-6 py-7 bg-unilectives-card hover:bg-gray-100 shadow-lg rounded-xl space-y-4 cursor-pointer">
            {/* Course courseCode + Ratings */}
            <div className="flex flex-wrap justify-between text-2xl">
              <h1 className="font-bold block truncate">{review.courseCode}</h1>
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
            <p className="text-unilectives-headings break-all line-clamp-3">
              {review.description}
            </p>
            {/* Icons */}
            <div className="flex flex-wrap ml-auto gap-5 w-fit">
              <ArrowSmallUpIcon className="w-6 h-6 inline-block" />
              <BookmarkIcon className="w-6 h-6 inline-block" />
              <PencilSquareIcon className="w-6 h-6 inline-block" />
              <TrashIcon className="w-6 h-6 inline-block" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

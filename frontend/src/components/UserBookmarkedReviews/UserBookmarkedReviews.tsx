"use client";

import { Review, Reviews, TabsType } from "@/types/api";
import Dropdown from "../Dropdown/Dropdown";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Pagination from "../Pagination/Pagination";
import { validatedReq } from "@/utils/request";
import { useSession } from "next-auth/react";

export default function UserBookmarkedReviews({
  reviews,
  setTabs,
}: Reviews & {
  setTabs: Dispatch<SetStateAction<TabsType>>;
}) {
  const [selected, setSelected] = useState("");
  const [cardView, setCardView] = useState(true);
  const [bookmarked, setBookmarked] = useState<string>();
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  const itemPerPage = 9;

  // Change review sorting based on dropdown
  useEffect(() => {
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

    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["Bookmarked"].data = sortedReviews;
      return newTab;
    });
  }, [selected, reviews]);

  // Bookmark review
  const bookmarkReview = async (review: Review) => {
    setBookmarked(review.reviewId);
    const body = {
      reviewId: review.reviewId,
      zid: session?.user?.id,
      bookmark: false,
    };
    await validatedReq(
      "POST",
      "/reviews/bookmark",
      session?.user?.accessToken ?? "",
      session?.user?.id ?? "",
      body
    );
  };

  useEffect(() => {
    if (!bookmarked) return;
    // Optimistic UI update for deleting a review
    const newReviews = reviews.filter(
      (review) => review.reviewId !== bookmarked
    );
    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["Bookmarked"].data = newReviews;
      return newTab;
    });
  }, [bookmarked]);

  return (
    <div className='space-y-5 isolate'>
      <div className='flex flex-wrap items-center gap-5 justify-between'>
        {/* Review order */}
        <div className='min-w-[275px] max-w-[275px] sm:min-w-full [&>*]:z-10'>
          <Dropdown
            options={[
              "Most Recent",
              "Most Recently Taken",
              "Highest Rating to Lowest Rating",
              "Lowest Rating to Highest Rating",
            ]}
            placeholder='Sort by'
            defaultValue={selected}
            onChange={setSelected}
          />
        </div>
        {/* Toggle Switch */}
        {reviews.length > 0 && (
          <div className='flex ml-auto gap-2'>
            <span>Card</span>
            <div className='-scale-1'>
              <ToggleSwitch
                accessibleTitle='card-list-view'
                defaultValue={cardView}
                onChange={setCardView}
              />
            </div>
            <span>List</span>
          </div>
        )}
      </div>
      {/* Reviews */}
      {/* List view */}
      {!cardView && (
        <div>
          {reviews
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((review: Review, index: number) => (
              <div
                key={index}
                className='flex justify-between items-center gap-2 sm:flex-wrap border border-transparent border-b-black/25 px-4 py-4'
              >
                <div className='flex w-1/2 sm:w-full sm:flex-col sm:items-start items-center gap-2'>
                  {/* Title */}
                  <h1 className='font-bold text-xl'>{review.courseCode}</h1>
                  {/* Description */}
                  <p className='text-unilectives-headings dark:text-gray-100 w-full truncate'>
                    {!review.description ? "-" : review.description}
                  </p>
                </div>
                {/* Icons */}
                <div className='flex flex-1 flex-wrap gap-5 justify-end'>
                  <button className='duration-100 hover:text-unilectives-blue/75'>
                    <BookmarkIcon
                      onClick={() => bookmarkReview(review)}
                      className='w-6 h-6 inline-block'
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Card view */}
      {cardView && (
        <div className='grid grid-cols-3 lg:grid-cols-1 gap-12'>
          {reviews
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((review: Review, index: number) => (
              <div
                key={index}
                className='box-border isolate px-6 py-7 bg-unilectives-card dark:bg-slate-700 shadow-lg shadow-gray-600 rounded-xl space-y-4'
              >
                {/* Course courseCode + Ratings */}
                <div className='flex flex-wrap justify-between text-2xl'>
                  <h1 className='font-bold block truncate'>
                    {review.courseCode}
                  </h1>
                  <div className='text-right'>
                    {/* StarRating */}
                    <div className='text-2xl inline'>
                      <Rating
                        color='purple'
                        type='star'
                        overallRating={review.overallRating}
                      />
                    </div>
                  </div>
                </div>
                {/* Description */}
                <p className='text-unilectives-headings dark:text-gray-100 break-all line-clamp-3 h-[4.5rem]'>
                  {!review.description ? "-" : review.description}
                </p>
                {/* Icons */}
                <div className='flex flex-wrap ml-auto gap-5 w-fit'>
                  <button className='duration-100 hover:text-unilectives-blue/75'>
                    <BookmarkIcon
                      onClick={() => bookmarkReview(review)}
                      className='w-6 h-6 inline-block'
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Pagination */}
      {reviews.length > 0 ? (
        <Pagination
          totalItems={reviews.length}
          itemPerPage={itemPerPage}
          onPageChange={(page: number) => setPage(page)}
        />
      ):(
        <div className="text-center">No reviews bookmarked yet.</div>
      )}
    </div>
  );
}

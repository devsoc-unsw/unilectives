"use client";

import { ReviewNative, TabsType, ReviewsNative } from "@/types/api";
import Dropdown from "../Dropdown/Dropdown";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import EditReviewModal from "../EditReviewModal/EditReviewModal";
import Pagination from "../Pagination/Pagination";
import RemoveReviewModal from "../RemoveReviewModal/RemoveReviewModal";

export default function UserReviews({
  reviews,
  setTabs,
}: ReviewsNative & {
  setTabs: Dispatch<SetStateAction<TabsType>>;
}) {
  const [selected, setSelected] = useState("");
  const [cardView, setCardView] = useState(true);
  const [deleted, setDeleted] = useState<string>();
  const [edited, setEdited] = useState<{
    reviewId: string;
    authorName: string;
    grade: number | null;
  }>();
  const [page, setPage] = useState(1);
  const itemPerPage = 9;

  // Change review sorting based on dropdown
  useEffect(() => {
    const sortedReviews = [...reviews];
    switch (selected) {
      case "Most Recent":
        sortedReviews.sort(
          (r1: ReviewNative, r2: ReviewNative) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r1.createdTimestamp)
        );
        break;
      case "Most Recently Taken":
        sortedReviews.sort((r1: ReviewNative, r2: ReviewNative) =>
          r2.termTaken.localeCompare(r1.termTaken)
        );
        break;
      case "Highest Rating to Lowest Rating":
        sortedReviews.sort(
          (r1: ReviewNative, r2: ReviewNative) => r2.overallRating - r1.overallRating
        );
        break;
      case "Lowest Rating to Highest Rating":
        sortedReviews.sort(
          (r1: ReviewNative, r2: ReviewNative) => r1.overallRating - r2.overallRating
        );
        break;
    }
    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["My reviews"].data = sortedReviews;
      return newTab;
    });
  }, [selected, reviews]);

  useEffect(() => {
    if (!deleted) return;
    // Optimistic UI update for deleting a review
    const newReviews = reviews.filter((review) => review.reviewId !== deleted);
    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["My reviews"].data = newReviews;
      return newTab;
    });
  }, [deleted]);

  useEffect(() => {
    if (!edited) return;
    // Optimistic UI update for deleting a review
    const newReviews = [...reviews];
    const target = newReviews.find(
      (review) => review.reviewId === edited.reviewId
    );
    if (!target) return;
    target.authorName = edited.authorName;
    target.grade = edited.grade;
    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["My reviews"].data = newReviews;
      return newTab;
    });
  }, [edited]);

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
      </div>
      {/* Reviews */}
      {/* List view */}
      {!cardView && (
        <div className='grid grid-cols-1'>
          {reviews
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((review: ReviewNative, index: number) => (
              <div
                key={index}
                className='flex justify-between items-center gap-2 sm:flex-wrap border border-transparent border-b-black/25 px-4 py-4'
              >
                <div className='flex w-1/2 sm:w-full sm:flex-col sm:items-start items-center gap-2'>
                  {/* Title */}
                  <h2 className='font-bold text-xl'>{review.courseCode}</h2>
                  {/* Description */}
                  <p className='text-unilectives-headings dark:text-gray-200 w-full truncate'>
                    {!review.description ? "-" : review.description}
                  </p>
                </div>
                {/* Icons */}
                <div className='flex flex-1 flex-wrap gap-5 justify-end'>
                  <EditReviewModal review={review} setEdited={setEdited} />
                  <RemoveReviewModal review={review} setDeleted={setDeleted} />
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
            .map((review: ReviewNative, index: number) => (
              <div
                key={index}
                className='box-border isolate px-6 py-7 bg-unilectives-card dark:bg-slate-700 shadow-lg shadow-gray-600 rounded-xl space-y-4'
              >
                {/* Course courseCode + Ratings */}
                <div className='flex flex-wrap justify-between text-2xl'>
                  <h2 className='font-bold block truncate'>
                    {review.courseCode}
                  </h2>
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
                <p className='text-unilectives-headings dark:text-gray-200 break-all line-clamp-3 h-[4.5rem]'>
                  {!review.description ? "-" : review.description}
                </p>
                {/* Icons */}
                <div className='flex flex-wrap ml-auto gap-5 w-fit'>
                  <EditReviewModal review={review} setEdited={setEdited} />
                  <RemoveReviewModal review={review} setDeleted={setDeleted} />
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
      ) : (
        <div className="text-center">No courses reviewed yet.</div>
      )}
    </div>
  );
}

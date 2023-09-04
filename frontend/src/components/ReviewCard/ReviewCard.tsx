"use client";

import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkedIcon } from "@heroicons/react/24/solid";
import Rating from "../Rating/Rating";
import TruncatedDescription from "../TruncatedDescription/TruncatedDescription";
import ReportModal from "../ReportModal/ReportModal";
import { Review } from "@/types/api";
import { format } from "date-fns";
import { post, validatedReq } from "@/utils/request";
import { useSession } from "next-auth/react";
import { MutableRefObject } from "react";

type AltSetCurrentReviewsType = (r2: Review[]) => Review[];
type AltSetBookmarkedReviewsType = (r2: string[]) => string[];

export default function ReviewCard({
  review,
  reviewsRef,
  setCurrentReviews,
  bookmarkedReviews,
  setAllBookmarkedReviews,
}: {
  review: Review;
  reviewsRef: MutableRefObject<Review[]>;
  setCurrentReviews: (r: Review[] | AltSetCurrentReviewsType) => void;
  bookmarkedReviews: string[];
  setAllBookmarkedReviews: (r: string[] | AltSetBookmarkedReviewsType) => void;
}) {
  const { data: session } = useSession();
  const upvote = !review.upvotes.includes(session?.user?.id!);
  const bookmarked = bookmarkedReviews.includes(review.reviewId);

  const handleUpvotes = async () => {
    const body = {
      reviewId: review.reviewId,
      zid: session?.user?.id,
      upvote,
    };
    await validatedReq(
      "POST",
      "/reviews/upvote",
      session?.user?.accessToken ?? "",
      session?.user?.id ?? "",
      body);
    // Optimistic UI Update for Upvotes
    setCurrentReviews((prev: Review[]) => {
      const refTarget = reviewsRef.current?.find(
        (r: Review) => r.reviewId === review.reviewId
      ) as Review;
      if (upvote) {
        refTarget.upvotes.push(session?.user?.id as string);
      } else {
        refTarget.upvotes = refTarget.upvotes.filter(
          (userUpvote: string) => userUpvote != (session?.user?.id as string)
        );
      }
      return [...prev];
    });
  };

  const handleBookmark = async () => {
    const body = {
      reviewId: review.reviewId,
      zid: session?.user?.id,
      bookmark: !bookmarked,
    };
    await validatedReq(
      "POST",
      "/reviews/bookmark",
      session?.user?.accessToken ?? "",
      session?.user?.id ?? "",
      body);
    // Optimistic UI update for bookmark
    setAllBookmarkedReviews((prev: string[]) => {
      let newBookmarkedReviews = [...prev];
      if (!bookmarked) {
        newBookmarkedReviews.push(review.reviewId);
      } else {
        newBookmarkedReviews = newBookmarkedReviews.filter(
          (r: string) => r !== review.reviewId
        );
      }
      return newBookmarkedReviews;
    });
  };

  return (
    <div className="px-10 py-5 space-y-2 shadow-review-card rounded-md bg-white isolate">
      {/* Title + Date */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        {review.title ? <h2 className="font-bold">{!review.title ? "-" : review.title}</h2> : <div></div>}
        <p>{format(new Date(review.createdTimestamp), "dd/MM/yyyy")}</p>
      </div>
      {/* Rating + Author */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div>
          Overall:{" "}
          <Rating
            color="purple"
            type="star"
            overallRating={review.overallRating}
          />
        </div>
        <p className="text-unilectives-subheadings">{review.authorName}</p>
      </div>
      {/* Term taken + Grade */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <p>Term taken: {review.termTaken}</p>
        <p className="text-unilectives-subheadings">
          Grade: {!review.grade ? "-" : review.grade}
        </p>
      </div>
      {/* Circle rating */}
      <div className="flex flex-wrap gap-2 justify-around">
        {/* Enjoyability */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Enjoyment</p>
          <Rating
            color="blue"
            type="circle"
            overallRating={review.enjoyability}
          />
        </div>
        {/* Usefulness */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Usefulness</p>
          <Rating
            color="blue"
            type="circle"
            overallRating={review.usefulness}
          />
        </div>
        {/* Manageability */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Manageability</p>
          <Rating
            color="blue"
            type="circle"
            overallRating={review.manageability}
          />
        </div>
      </div>
      {/* Description */}
      <TruncatedDescription content={review.description} maxCharacters={500} />
      {/* Icons */}
      <div className="flex justify-between">
        {/* Upvotes */}
        <button
          className={
            session?.user?.id
              ? `flex items-center gap-1 ${
                  !upvote ? "text-unilectives-blue" : ""
                } hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer`
              : `flex items-center gap-1 ${
                  !upvote ? "text-unilectives-blue" : ""
                }`
          }
          onClick={handleUpvotes}
          disabled={!session?.user?.id}
        >
          <span>{review.upvotes.length}</span>
          <HandThumbUpIcon className="w-5 h-5" />
        </button>
        {session?.user?.id && (
          <div className="flex items-center gap-2">
            {/* Bookmark */}
            <button
              className="hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer"
              onClick={handleBookmark}
            >
              {bookmarked ? (
                <BookmarkedIcon className="w-5 h-5" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
            {/* Flag */}
            <ReportModal reviewId={review.reviewId} />
          </div>
        )}
      </div>
    </div>
  );
}

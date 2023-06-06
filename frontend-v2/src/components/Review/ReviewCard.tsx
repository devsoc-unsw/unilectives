"use client";

import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import Rating from "../Rating";
import TruncatedDescription from "../TruncatedDescription";
import ReportModal from "./ReportModal";
import { Review } from "@/types/api";
import { format } from "date-fns";

export default function ReviewCard({ review }: { review: Review }) {
  const handleUpvotes = () => {
    // TODO: Handle upvotes here (Do this when user session can already be handled)
  };

  const handleBookmark = () => {
    // TODO: Handle bookmark here (Do this when user session can already be handled)
  };

  return (
    <div className="px-10 py-5 space-y-2 shadow-review-card rounded-md bg-white isolate">
      {/* Title + Date */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <h1 className="font-bold">{!review.title ? "-" : review.title}</h1>
        <p>{format(new Date(review.createdTimestamp), "dd/MM/yyyy")}</p>
      </div>
      {/* Rating + Author */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div>
          Overall:{" "}
          <Rating color="purple" type="star" rating={review.overallRating} />
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
          <Rating color="blue" type="circle" rating={review.enjoyability} />
        </div>
        {/* Usefulness */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Usefulness</p>
          <Rating color="blue" type="circle" rating={review.usefulness} />
        </div>
        {/* Manageability */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Manageability</p>
          <Rating color="blue" type="circle" rating={review.manageability} />
        </div>
      </div>
      {/* Description */}
      <TruncatedDescription content={review.description} maxCharacters={500} />
      {/* Icons */}
      <div className="flex justify-between">
        {/* Upvotes */}
        <button
          className="flex items-center gap-1 hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer"
          onClick={handleUpvotes}
        >
          <span>{review.upvotes.length}</span>
          <HandThumbUpIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            className="hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer"
            onClick={handleBookmark}
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>
          {/* Flag */}
          <ReportModal reviewId={review.reviewId} />
        </div>
      </div>
    </div>
  );
}

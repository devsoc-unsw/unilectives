import {
  BookmarkIcon,
  FlagIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import CircleRating from "./CircleRating";
import Rating from "./StarRating";
import ReviewDescription from "./ReviewDescription";

export type Review = {
  reviewId: string;
  courseCode: string;
  authorName: string;
  title: string;
  description: string;
  grade: number;
  termTaken: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  upvotes: string[];
  manageability: number;
  enjoyability: number;
  usefulness: number;
  overallRating: number;
};

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="px-10 py-5 space-y-2 shadow-card rounded-md">
      {/* Title + Date */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <h1 className="font-bold">{!review.title ? "-" : review.title}</h1>
        <p>{format(new Date(review.updatedTimestamp), "dd/MM/yyyy")}</p>
      </div>
      {/* Rating + Author */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div>
          Overall: <Rating rating={review.overallRating} />
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
          <CircleRating rating={review.enjoyability} />
        </div>
        {/* Usefulness */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Usefulness</p>
          <CircleRating rating={review.usefulness} />
        </div>
        {/* Manageability */}
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">Manageability</p>
          <CircleRating rating={review.manageability} />
        </div>
      </div>
      {/* Description */}
      <ReviewDescription content={review.description} maxCharacters={500} />
      {/* Icons */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1 hover:text-unilectives-blue cursor-pointer">
          <span>{review.upvotes.length}</span>
          <HandThumbUpIcon className="w-5 h-5" />
        </div>
        <div className="flex gap-2">
          <BookmarkIcon className="w-5 h-5 hover:text-unilectives-blue cursor-pointer" />
          <FlagIcon className="w-5 h-5 hover:text-unilectives-blue cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

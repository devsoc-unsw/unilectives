import {
  ArrowSmallUpIcon,
  BookmarkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Rating from "../Rating/Rating";
import { Review } from "@/types/api";

export default function UserReviewCard({ review }: { review: Review }) {
  return (
    <div className="box-border isolate px-6 py-7 bg-unilectives-card shadow-lg rounded-xl space-y-4">
      {/* Course courseCode + Ratings */}
      <div className="flex flex-wrap justify-between text-2xl">
        <h1 className="font-bold block truncate">{review.courseCode}</h1>
        <div className="text-right">
          {/* StarRating */}
          <div className="text-2xl inline">
            <Rating color="purple" type="star" rating={review.overallRating} />
          </div>
        </div>
      </div>
      {/* Description */}
      <p className="text-unilectives-headings break-all line-clamp-3">
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
  );
}

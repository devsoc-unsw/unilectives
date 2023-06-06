import Image from "next/image";
import waves from "../../../assets/waves.svg";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import TermsGroup from "@/components/TermsGroup";
import Link from "next/link";
import DoughnutChart from "@/components/DoughnutChart";
import { notFound } from "next/navigation";
import ReviewsBar from "@/components/Review/ReviewsBar";
import Rating from "@/components/Rating";
import ReviewSearchbar from "@/components/Review/ReviewSearchBar";
import { Course } from "@/types/api";

/**
 * Fetch course from backend based on the given id
 */
const getCourse = async (id: string) => {
  const res = await fetch(`http://localhost:3030/api/v1/courses`, {
    method: "GET",
  });

  // Return undefined if status code is not 200
  if (!res.ok) return;

  // Return course
  const result = await res.json();
  return result.courses.find(
    (course: Course) => course.courseCode === id.toUpperCase()
  );
};

/**
 * Fetch reviews from backend based on the given id
 */
const getReviews = async (id: string) => {
  const res = await fetch(
    `http://localhost:3030/api/v1/reviews/${id.toUpperCase()}`,
    {
      method: "GET",
    }
  );
  // Return reviews
  const result = await res.json();
  return result.reviews;
};

export default async function ReviewPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  const course = await getCourse(params.id);

  if (!course) notFound();

  const reviews = await getReviews(course.courseCode);

  return (
    <div className="isolate">
      {/* Header */}
      <div className="relative">
        <div className="w-1/2 ml-auto md:w-full pr-16 md:px-8 py-8">
          {/* Search bar */}
          <ReviewSearchbar />
        </div>
        {/* Waves */}
        <Image
          className="w-full h-full absolute object-cover top-0 -z-10"
          src={waves}
          alt="Waves"
        />
      </div>
      {/* Course details */}
      <div className="flex gap-8 pt-12 px-16 md:px-8 lg:pt-8 md:flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <section className="space-y-4 w-full block md:static md:max-h-full sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-scroll scrollbar-none">
            <h1 className="text-6xl font-bold break-words">
              {course.courseCode}
            </h1>
            <h2 className="text-3xl font-bold break-words">{course.title}</h2>
            {/* Terms */}
            <TermsGroup
              className="py-1 px-2 rounded-full bg-unilectives-tags-pink font-bold text-black/50"
              terms={course.terms}
            />
            {/* Link to handbook */}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${
                course.courseCode
              }`}
              className="flex items-center w-fit gap-1 text-unilectives-blue hover:underline flex-1"
            >
              <LinkIcon className="w-4 h-4" />
              {course.courseCode} Handbook Page
            </Link>
            {/* StarRating */}
            <div className="space-x-2">
              <div className="text-2xl inline">
                <Rating type="star" color="purple" rating={course.rating} />
              </div>
              {/* Number of reviews */}
              <span>
                {/* Format number to their abbreviated string e.g 1000 to 1k, or 1000000 to 1M */}
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(course.reviewCount)}{" "}
                reviews
              </span>
            </div>
            {/* Doughnut Charts */}
            <div className="flex flex-wrap justify-around">
              {[
                { metric: course.enjoyability, title: "Enjoyment" },
                { metric: course.usefulness, title: "Usefulness" },
                { metric: course.manageability, title: "Manageability" },
              ].map((item, index) => (
                <div key={index}>
                  <DoughnutChart
                    rating={item.metric}
                    width={90}
                    strokeWidth={9}
                  />
                  <p className="text-center font-bold">{item.title}</p>
                </div>
              ))}
            </div>
            {/* Description */}
            <p className="whitespace-pre-line">{course.description}</p>
          </section>
        </Suspense>
        {/* Reviews */}
        {/* Show reviews is separated as another client component "ReviewsBar"
        so the review page can stay as a server side component to ensure server side
        rendering */}
        <section className="space-y-4 w-full mb-8">
          <Suspense fallback={<div>Loading...</div>}>
            {reviews.length === 0 ? (
              <div>No reviews yet</div>
            ) : (
              <ReviewsBar courseCode={course.courseCode} reviews={reviews} />
            )}
          </Suspense>
        </section>
      </div>
    </div>
  );
}

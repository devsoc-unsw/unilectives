import Image from "next/image";
import icon from "../../../assets/icon.png";
import waves from "../../../assets/waves.svg";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, Suspense } from "react";
import TermsGroup from "@/components/TermsGroup";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import DoughnutChart from "@/components/DoughnutChart";
import { notFound } from "next/navigation";
import ReviewCard, { Review } from "@/components/ReviewCard";
import Searchbar from "@/components/SearchBar";

/**
 * Fetch course from backend based on the given id
 */
const getCourse = async (id: string) => {
  const response = await fetch(`http://localhost:3030/api/v1/courses`, {
    method: "GET",
  });

  // Return undefined if status code is not 200
  if (response.status !== 200) return;

  // Return course
  const result = await response.json();
  return result.courses.find(
    (course: any) => course.courseCode === id.toUpperCase()
  );
};

/**
 * Fetch reviews from backend based on the given id
 */
const getReviews = async (id: string) => {
  const response = await fetch(
    `http://localhost:3030/api/v1/reviews/${id.toUpperCase()}`,
    {
      method: "GET",
    }
  );
  // Return reviews
  const result = await response.json();
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
    <>
      {/* Header */}
      <div className="relative">
        <div className="flex flex-wrap justify-between gap-4 px-16 md:px-8 sm:px-4 py-8">
          {/* Icon */}
          <div className="flex items-center gap-2">
            <Image className="w-12" src={icon} alt="Uni-lectives" />
            <h1 className="font-bold text-2xl text-unilectives-icon">
              Uni-lectives
            </h1>
          </div>
          {/* Search bar */}
          <Searchbar className="flex items-center gap-1 border border-black text-black rounded-2xl px-4 py-2 shadow-md w-1/2 xs:w-full" />
        </div>
        {/* Waves */}
        <Image
          className="w-full absolute top-0 -z-10"
          src={waves}
          alt="Waves"
        />
      </div>
      {/* Course details */}
      <div className="flex gap-8 px-16 md:px-8 sm:px-4 md:flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <section className="space-y-4 w-full block md:static md:max-h-full sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-scroll scrollbar-none">
            <h1 className="text-6xl font-bold">{course.courseCode}</h1>
            <h2 className="text-3xl font-bold">{course.title}</h2>
            {/* Terms */}
            <TermsGroup terms={course.terms} />
            {/* Link to handbook */}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`//www.handbook.unsw.edu.au/undergraduate/courses/2023/${course.courseCode}`}
              className="flex items-center w-fit text-unilectives-blue hover:underline flex-1"
            >
              <LinkIcon className="w-4 h-4" />
              {course.courseCode} Handbook Page
            </Link>
            {/* StarRating */}
            <div className="space-x-2">
              <StarRating rating={course.rating} />
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
              <div>
                <DoughnutChart
                  rating={course.enjoyability}
                  width={90}
                  strokeWidth={9}
                />
                <p className="text-center font-bold">Enjoyment</p>
              </div>
              <div>
                <DoughnutChart
                  rating={course.usefulness}
                  width={90}
                  strokeWidth={9}
                />
                <p className="text-center font-bold">Usefulness</p>
              </div>
              <div>
                <DoughnutChart
                  rating={course.manageability}
                  width={90}
                  strokeWidth={9}
                />
                <p className="text-center font-bold">Manageability</p>
              </div>
            </div>
            {/* Description */}
            <p>{course.description}</p>
          </section>
        </Suspense>
        {/* Reviews */}
        <section className="space-y-4 w-full mb-8">
          {/* Review Heading */}
          <h3 className="text-2xl font-bold">Reviews</h3>
          {/* Dropdown */}
          {/* Add Review button */}
          {/* <Modal /> */}
          {/* Switch */}
          {/* Reviews */}
          <Suspense fallback={<div>Loading...</div>}>
            {reviews.map((review: Review, index: number) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Suspense>
        </section>
      </div>
    </>
  );
}

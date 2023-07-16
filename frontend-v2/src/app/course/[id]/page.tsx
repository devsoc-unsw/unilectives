import Image from "next/image";
import waves from "../../../assets/waves.svg";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import TermsGroup from "@/components/TermsGroup/TermsGroup";
import Link from "next/link";
import DoughnutChart from "@/components/DoughnutChart/DoughnutChart";
import { notFound } from "next/navigation";
import ReviewsBar from "@/components/ReviewsBar/ReviewsBar";
import Rating from "@/components/Rating/Rating";
import ReviewSearchbar from "@/components/ReviewSearchBar/ReviewSearchBar";
import { ICourse, Reviews } from "@/types/api";
import { get } from "@/utils/request";
import ReviewModal from "@/components/ReviewModal/ReviewModal";

export default async function ReviewPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  const { course } = (await get(
    `/course/${params.id.toUpperCase()}`
  )) as ICourse;

  if (!course) notFound();

  const { reviews } = (await get(
    `/reviews/${course.courseCode.toUpperCase()}`
  )) as Reviews;

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
                {course.reviewCount
                  ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(course.reviewCount)
                  : 0}{" "}
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
            {/* Pre-requisites group */}
            {course.enrolmentRules ? (
              <div>
                <h3 className="font-bold">Enrolment Rules</h3>
                <p>{course.enrolmentRules}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <h3 className="font-bold">Description</h3>
              <p className="whitespace-pre-line">{course.description}</p>
            </div>
          </section>
        </Suspense>
        {/* Reviews */}
        {/* Show reviews is separated as another client component "ReviewsBar"
        so the review page can stay as a server side component to ensure server side
        rendering */}
        <section className="space-y-4 w-full mb-8">
          <Suspense fallback={<div>Loading...</div>}>
            {reviews && reviews.length !== 0 ? (
              <ReviewsBar courseCode={course.courseCode} reviews={reviews} />
            ) : (
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Reviews</h3>
                <ReviewModal courseCode={course.courseCode} />
                <p className="text-black/50">No reviews yet</p>
              </div>
            )}
          </Suspense>
        </section>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import icon from "../../../assets/icon.png";
import waves from "../../../assets/waves.svg";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import Link from "next/link";
import TermsGroup from "@/components/TermsGroup";
import Rating from "@/components/Rating";
import CourseCard from "@/components/CourseCard";
import DoughnutChart from "@/components/DoughnutChart";

type SearchbarEventTarget = EventTarget & {
  query: {
    value: string;
  };
};

type ReviewProps = {
  params?: any;
};

type Course = {
  courseCode: string;
  archived: boolean;
  attributes: string[];
  calendar: string;
  campus: string;
  description: string;
  enrolmentRules: string;
  equivalents: string[];
  exclusions: string[];
  faculty: string;
  fieldOfEducation: string;
  genEd: boolean;
  level: number;
  school: string;
  studyLevel: string;
  terms: number[];
  title: string;
  uoc: number;
  rating: number; // same as overallRating
  reviewCount: number;
  overallRating: number;
  manageability: number;
  usefulness: number;
  enjoyability: number;
};

// Get course details
const getCourse = async (id: string) => {
  const response = await fetch(`http://localhost:3030/api/v1/courses`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  // Return undefined if status code is not 200
  if (response.status !== 200) return;

  // Return course
  const result = await response.json();
  return result.courses.find(
    (course: Course) => course.courseCode === id.toUpperCase()
  );
};

export default function Review({ params }: ReviewProps) {
  const course = use(getCourse(params.id));

  // Direct user to page not found if course doesn't exists
  if (!course) notFound();

  console.log(course);

  // const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const target = event.target as SearchbarEventTarget;
  //   console.log("Submitted with: ", target.query.value);
  // };

  return (
    <>
      {/* Header */}
      <div className="relative isolate">
        <div className="flex flex-wrap justify-between gap-4 mx-16 md:mx-8 sm:mx-4 py-8">
          {/* Icon */}
          <div className="flex items-center gap-2">
            <Image className="w-12" src={icon} alt="Uni-lectives" />
            <h1 className="font-bold text-2xl text-unilectives-icon">
              Uni-lectives
            </h1>
          </div>
          {/* Search bar */}
          <form
            className="flex items-center gap-1 border border-black text-black rounded-2xl px-5 py-2 shadow-md w-1/2 xs:w-full"
            name="review-search-bar"
          >
            {/* Search icon */}
            <button type="submit">
              <MagnifyingGlassIcon className="w-5 h-5 bg-transparent" />
            </button>
            {/* Input */}
            <input
              type="text"
              name="query"
              title="Search here..."
              placeholder="Search here..."
              className="w-full outline-none bg-transparent placeholder:text-black"
            />
          </form>
        </div>
        {/* Waves */}
        <Image
          className="w-full absolute top-0 -z-10"
          src={waves}
          alt="Waves"
        />
      </div>
      {/* Course details */}
      <Suspense>
        <section className="mx-16 md:mx-8 sm:mx-4 space-y-4">
          <h1 className="text-6xl font-bold">{course.courseCode}</h1>
          <h2 className="text-3xl font-bold">{course.title}</h2>
          {/* Terms */}
          <TermsGroup terms={course.terms} />
          {/* Link to handbook */}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`//www.handbook.unsw.edu.au/undergraduate/courses/2023/${course.courseCode}`}
            className="flex items-center text-unilectives-blue hover:underline"
          >
            <LinkIcon className="w-4 h-4" />
            {course.courseCode} Handbook Page
          </Link>
          {/* Rating */}
          <Rating rating={course.rating} />
          <p>{course.description}</p>
          <DoughnutChart label="Usefulness" rating={course.usefulness} />
        </section>
      </Suspense>
    </>
  );
}

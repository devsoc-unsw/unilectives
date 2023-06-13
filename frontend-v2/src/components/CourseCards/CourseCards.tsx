"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import Link from "next/link";
import { useRef, useState } from "react";
import { get } from "@/utils/request";
import InfiniteScroll from "react-infinite-scroller";

export default function CourseCards({}) {
  // Refs
  const fetchCourse = useRef(false);

  // States
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [courseFinished, setCourseFinished] = useState(false);

  // Constants
  const currentCourses = allCourses.flatMap((course) => course);

  // Load more courses
  const loadMore = async (index: number) => {
    if (!fetchCourse.current && !courseFinished) {
      try {
        fetchCourse.current = true;

        // Get courses from offset
        const { courses } = (await get(
          `/courses?offset=${index * 25}`
        )) as Courses;

        // All courses has been loaded
        if (courses.length === 0) {
          setCourseFinished(true);
          return;
        }

        // Add courses
        if (!courseFinished) {
          setAllCourses((prev) => [...prev, ...courses]);
        }
      } finally {
        fetchCourse.current = false;
      }
    }
  };

  return (
    <>
      <InfiniteScroll
        hasMore={!courseFinished}
        initialLoad
        pageStart={-1}
        loadMore={loadMore}
        loader={<p className="text-sm text-center text-gray-800">Loading...</p>}
        className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center"
        element="main"
      >
        {currentCourses.map((c: Course, index: number) => (
          <Link href={`/course/${c.courseCode}`} key={index}>
            <CourseCard
              title={c.title}
              courseCode={c.courseCode}
              rating={c.rating}
              reviewCount={c.reviewCount}
              terms={c.terms}
            />
          </Link>
        ))}
      </InfiniteScroll>
      {courseFinished && (
        <p className="mt-10 text-sm text-center text-gray-800">
          No courses found
        </p>
      )}
    </>
  );
}

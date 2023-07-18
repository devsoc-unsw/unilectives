"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";

export default function CoursesList() {
  // Refs
  const courseFinishedRef = useRef(false);
  const indexRef = useRef(0);

  // States
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [noMoreCourses, setNoMoreCourses] = useState(false);

  // Constants
  const currentCourses = allCourses.flatMap((course) => course);

  // Load more courses
  const loadMore = async (index: number) => {
    // If user scroll position is not in the end
    if (window.innerHeight + window.pageYOffset < document.body.offsetHeight)
      return;

    try {
      if (courseFinishedRef.current) return;
      // Get courses from offset
      const { courses } = (await get(`/courses?offset=${index}`)) as Courses;
      // All courses has been loaded
      if (!courses.length) {
        courseFinishedRef.current = true;
        return;
      }
      // Add courses
      setAllCourses((prev) => [...prev, ...courses]);
    } catch (err) {
      setNoMoreCourses(true);
    }
  };

  useEffect(() => {
    // Load courses on scroll
    const loadOnScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !courseFinishedRef.current
      ) {
        loadMore(indexRef.current);
        indexRef.current += 25;
      }
    };

    // Initial load
    loadOnScroll();

    // Load on scroll
    window.addEventListener("scroll", loadOnScroll);

    // Clean up
    return () => window.removeEventListener("scroll", loadOnScroll);
  }, []);

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center">
        {currentCourses.map((c: Course, index: number) => (
          <a href={`/course/${c.courseCode}`} key={index}>
            <CourseCard
              title={c.title}
              courseCode={c.courseCode}
              overallRating={c.overallRating}
              reviewCount={c.reviewCount}
              terms={c.terms}
            />
          </a>
        ))}
        {noMoreCourses && (
          <p className="text-center opacity-25">No more courses</p>
        )}
      </div>
    </>
  );
}

"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";

export default function CoursesList({ searchTerm }: { searchTerm?: string }) {
  // TODO: aborting inital characters entered

  // Refs
  const courseFinishedRef = useRef(false);
  const indexRef = useRef(0);
  const allCoursesRef = useRef<Course[]>([]);

  // States
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);

  // Load more courses
  const loadMore = (index: number) => {
    // If user scroll position is not in the end
    if (window.innerHeight + window.pageYOffset < document.body.offsetHeight)
      return;

    try {
      if (courseFinishedRef.current) {
        return;
      }
      const courses = allCoursesRef.current.splice(index, index + 25);
      if (!courses.length) {
        courseFinishedRef.current = true;
        return;
      }
      // Add courses
      setDisplayCourses((prev) => [...prev, ...courses]);
    } catch (err) {
      // TODO
    }
  };

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const { courses } = (await get(`/course/search/${searchTerm}`)) as Courses;
        allCoursesRef.current = courses;
      } catch (err) {
        // TODO
      }
      loadOnScroll();
    };

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

    courseFinishedRef.current = false;
    indexRef.current = 0;
    allCoursesRef.current = [];
    setDisplayCourses([]);

    // Get all courses from search
    getSearchResults();

    // Load on scroll
    window.addEventListener("scroll", loadOnScroll);

    // Clean up
    return () => window.removeEventListener("scroll", loadOnScroll);
  }, [searchTerm]);

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center">
        {displayCourses.map((c: Course, index: number) => (
          <a href={`/course/${c.courseCode}`} key={index}>
            <CourseCard
              title={c.title}
              courseCode={c.courseCode}
              rating={c.rating}
              reviewCount={c.reviewCount}
              terms={c.terms}
            />
          </a>
        ))}
        <p className="text-center opacity-25">No more courses</p>
      </div>
    </>
  );
}

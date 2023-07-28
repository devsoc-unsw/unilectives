"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";

export default function CoursesList({ searchTerm }: { searchTerm?: string }) {
  // Refs
  const courseFinishedRef = useRef(false);
  const indexRef = useRef(0);
  const allCoursesRef = useRef<Course[]>([]);

  // States
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load more courses
  const loadMore = async (index: number) => {
    // If user scroll position is not in the end
    if (window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
      return;
    }

    if (courseFinishedRef.current) {
      return;
    }

    let fetchedCourses: Course[] = [];
    if (searchTerm === "") {
      // default courses
      const { courses } = (await get(`/courses?offset=${index}`)) as Courses;
      fetchedCourses = courses;
    } else {
      // searched courses
      fetchedCourses = allCoursesRef.current.slice(index, index + 25);
    }

    if (!fetchedCourses.length) {
      courseFinishedRef.current = true;
      return;
    }
    
    setDisplayCourses((prev) => [...prev, ...fetchedCourses]);
  };


  useEffect(() => {
    const resetRefs = () => {
      courseFinishedRef.current = false;
      indexRef.current = 0;
      allCoursesRef.current = [];
    };

    const getSearchResults = async () => {
      try {
        const { courses } = (await get(`/course/search/${searchTerm}`)) as Courses;
        allCoursesRef.current = courses;
      } catch (err) {
        allCoursesRef.current = [];
      }
      setDisplayCourses(allCoursesRef.current.slice(0, 25));
      indexRef.current += 25;
      setInitialLoading(false);
    };

    const getDefaultResults = async () => {
      try {
        const { courses } = (await get(`/courses?offset=0`)) as Courses;
        setDisplayCourses(courses);
        indexRef.current += 25;
      } catch (err) {
        setDisplayCourses([]);
      }
      setInitialLoading(false);
    }

    const loadOnScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !courseFinishedRef.current
      ) {
        loadMore(indexRef.current);
        indexRef.current += 25;
      }
    };

    // update courses
    resetRefs();
    if (searchTerm === "") {
      getDefaultResults();
    } else {
      getSearchResults();
    }

    // scroll listener
    window.addEventListener("scroll", loadOnScroll);
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
        {!initialLoading 
          ? <p className="text-center opacity-25">No more courses</p>
          : <p className="text-center opacity-25">Loading courses...</p>
        }
      </div>
    </>
  );
}

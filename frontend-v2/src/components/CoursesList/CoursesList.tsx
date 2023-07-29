"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";

export default function CoursesList({ searchTerm }: { searchTerm?: string }) {
  const courseFinishedRef = useRef(false);
  const indexRef = useRef(0);
  const searchCoursesRef = useRef<Course[]>([]);

  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const paginationOffset = 25;

  const loadMore = async (index: number) => {
    const fetchCourses = async () => {
      let fetchedCourses: Course[] = [];
      if (searchTerm === "") {
        // default courses
        try {
          const { courses } = (await get(`/courses?offset=${index}`)) as Courses;
          fetchedCourses = courses;
        } catch (err) {
          fetchedCourses = [];
        }
      } else {
        // searched courses
        fetchedCourses = searchCoursesRef.current.slice(index, index + 25);
      }

      return fetchedCourses;
    }

    if (window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
      return;
    }
    if (courseFinishedRef.current) {
      return;
    }

    const courses = await fetchCourses();
    if (courses.length === 0) {
      courseFinishedRef.current = true;
      return;
    }

    setDisplayCourses((prev) => [...prev, ...courses]);
  };


  useEffect(() => {
    const resetRefs = () => {
      courseFinishedRef.current = false;
      indexRef.current = 0;
      searchCoursesRef.current = [];
    };
    const getSearchResults = async () => {
      try {
        const { courses } = (await get(`/course/search/${searchTerm}`)) as Courses;
        searchCoursesRef.current = courses;
      } catch (err) {
        searchCoursesRef.current = [];
      }
      setDisplayCourses(searchCoursesRef.current.slice(0, paginationOffset));
      indexRef.current += paginationOffset;
      setInitialLoading(false);
    };
    const getDefaultResults = async () => {
      try {
        const { courses } = (await get(`/courses?offset=0`)) as Courses;
        setDisplayCourses(courses);
        indexRef.current += paginationOffset;
      } catch (err) {
        setDisplayCourses([]);
      }
      setInitialLoading(false);
    }
    const getInitialDisplayCourses = () => {
      if (searchTerm === "") {
        getDefaultResults();
      } else {
        getSearchResults();
      }
    }
    const loadOnScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !courseFinishedRef.current
      ) {
        loadMore(indexRef.current);
        indexRef.current += paginationOffset;
      }
    };

    resetRefs();
    getInitialDisplayCourses();

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
              rating={c.overallRating}
              reviewCount={c.reviewCount}
              terms={c.terms}
            />
          </a>
        ))}
        {!initialLoading 
          ? <p className="text-center opacity-50">No more courses</p>
          : <p className="text-center opacity-50">Loading courses...</p>
        }
      </div>
    </>
  );
}

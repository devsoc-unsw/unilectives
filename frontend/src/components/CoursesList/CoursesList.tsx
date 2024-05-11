"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";
import { sortCourses } from "@/utils/sortCourses";
import SortDropdown from "../SortDropdown/SortDropdown";

export default function CoursesList({
  initialCourses,
  searchTerm,
}: {
  initialCourses: Course[];
  searchTerm: string;
}) {
  const courseFinishedRef = useRef(false);
  const indexRef = useRef(initialCourses.length);
  const searchCoursesRef = useRef<Course[]>([]);

  const [displayCourses, setDisplayCourses] =
    useState<Course[]>(initialCourses);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selected, setSelected] = useState("");

  const paginationOffset = 25;

  const loadMore = async (index: number) => {
    const fetchCourses = async () => {
      let fetchedCourses: Course[] = [];
      if (searchTerm === "") {
        // default courses
        try {
          const { courses } = (await get(
            `/courses?offset=${index}`,
          )) as Courses;
          fetchedCourses = courses;
        } catch (err) {
          fetchedCourses = [];
        }
      } else {
        // searched courses
        fetchedCourses = searchCoursesRef.current.slice(index, index + 25);
      }

      return fetchedCourses;
    };

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
      indexRef.current = initialCourses.length;
      searchCoursesRef.current = [];
    };
    const getSearchResults = async () => {
      try {
        const { courses } = (await get(
          `/course/search/${searchTerm}`,
        )) as Courses;
        searchCoursesRef.current = courses;
      } catch (err) {
        searchCoursesRef.current = [];
      }
      setDisplayCourses(searchCoursesRef.current.slice(0, paginationOffset));
      indexRef.current += paginationOffset;
      setInitialLoading(false);
    };
    const getInitialDisplayCourses = () => {
      if (searchTerm !== "") {
        getSearchResults();
      } else {
        setDisplayCourses(initialCourses.slice(0, paginationOffset));
        setInitialLoading(false);
      }
    };
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
      {/* SortDropdown Bar */}
      <SortDropdown selected={selected} setSelected={setSelected} />
      <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center">
        {sortCourses(displayCourses, selected).map(
          (c: Course, index: number) => (
            <a href={`/course/${c.courseCode}`} key={index}>
              <CourseCard
                title={c.title}
                courseCode={c.courseCode}
                overallRating={c.overallRating}
                reviewCount={c.reviewCount}
                terms={c.terms}
              />
            </a>
          ),
        )}
        {!initialLoading ? (
          <p className="text-center opacity-50">No more courses</p>
        ) : (
          <p className="text-center opacity-50">Loading courses...</p>
        )}
      </div>
    </>
  );
}

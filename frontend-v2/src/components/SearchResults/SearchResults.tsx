"use client";

import { Course, Courses } from "@/types/api";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";

export default function CoursesList({ searchTerm }: { searchTerm?: string }) {
  // TODO: frontend pagination

  // States
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    const searchCourses = async () => {
      try {
        const { courses } = (await get(`/course/search/${searchTerm}`)) as Courses;
        courses.length = 25;
        setAllCourses(courses);
      } catch (err) {
        // TODO: catch error (account for abort logic)
      }
    };
    searchCourses();
  }, [searchTerm])

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-5/6 items-center">
        {allCourses.map((c: Course, index: number) => (
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

"use client";

import { Course, Courses } from "@/types/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { get } from "@/utils/request";

export default function ReviewSearchbar() {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [focused, setFocused] = useState(false);

  const handleOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value.trim().replaceAll(" ", "%20"));
    }, 300), []
  );

  const handleOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleOnBlur = useCallback(
    debounce(() => {
      setFocused(false);
    }, 100), []
  );

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        if (searchTerm) {
          const { courses } = (await get(`/course/search/${searchTerm}`)) as Courses;
          setAllCourses(courses.slice(0, 50));
        } else {
          setAllCourses([]);
        }
      } catch (err) {
        console.log(`error fetching courses from /course/search/${searchTerm}`);
      }
    };
    getSearchResults();
  }, [searchTerm]);

  return (
    <div className="relative items-center gap-1 border border-white text-white rounded-2xl px-4 py-2">
      <div className="flex flex-row">
        {/* Search icon */}
        <MagnifyingGlassIcon className="w-5 h-5 my-1 mr-1 bg-transparent" />
        {/* Input */}
        <input
          type="text"
          name="query"
          title="Search for a course..."
          placeholder="Search here..."
          className="w-full outline-none bg-transparent placeholder:text-white"
          autoComplete="off"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
      </div>
      {/* Dropdown for search results */}
      {searchTerm && allCourses.length && focused ?
        <div className="absolute z-10 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-52 overflow-y-auto no-scrollbar">
          <div className="py-1">
            {allCourses.map((course: Course) => (
              <a href={`/course/${course.courseCode}`} className="hover:bg-gray-200 text-gray-700 font-bold block px-4 py-2 text-sm" key={course.courseCode}>{course.courseCode} - {course.title}</a>
            ))}
          </div>
        </div>
      : undefined}
    </div>
  );
}
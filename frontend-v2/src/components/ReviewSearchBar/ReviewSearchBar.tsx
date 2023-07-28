"use client";
import { Course, Courses } from "@/types/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce, set } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { get } from "@/utils/request";

export default function ReviewSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    updateSearchTerm(event);
  }

  const updateSearchTerm = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value.trim().replaceAll(" ", "%20"));
    }, 300), []
  );

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnBlur = () => {
    setFocused(false);
  }

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
      setIsLoading(false);
    };
    getSearchResults();
  }, [searchTerm]);

  return (
    <div className="relative border border-white text-white rounded-2xl py-2">
      <div className="flex flex-row px-3">
        {/* Search icon */}
        <MagnifyingGlassIcon className="w-5 h-5 my-1 bg-transparent" />
        {/* Input */}
        <input
          type="text"
          name="query"
          placeholder="Search for a course here..."
          className="w-full mx-1 outline-none bg-transparent placeholder:text-white"
          autoComplete="off"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
      </div>
      {/* Dropdown for search results */}
      {searchTerm && allCourses.length && focused && !isLoading ?
        <div
          className="absolute z-10 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-52 overflow-y-scroll no-scrollbar"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="py-1">
            {allCourses.map((course: Course) => (
              <a href={`/course/${course.courseCode}`} className="hover:bg-gray-200 text-gray-700 font-bold block px-4 py-2 text-sm" key={course.courseCode}>{course.courseCode} - {course.title}</a>
            ))}
          </div>
        </div>
      : undefined}
      {isLoading && !allCourses.length ?
      <div className="absolute z-10 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
        <p className="text-gray-700 font-bold block px-4 py-2 text-sm">Loading...</p>
      </div>
      : undefined}
    </div>
  );
}
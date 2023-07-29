"use client";
import { Course, Courses } from "@/types/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce, set } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { get } from "@/utils/request";
import ReviewSearchbarDropdown from "../ReviewSearchBarDropdown/ReviewSearchBarDropdown";

export default function ReviewSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setLoading(true);
    }
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
      setLoading(false);
    };
    getSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 500)
  }, []);

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
          disabled={initialLoading}
        />
      </div>
      {searchTerm && focused ?
        <ReviewSearchbarDropdown
          allCourses={allCourses}
          loading={loading}
        />
      : undefined}
    </div>
  );
}
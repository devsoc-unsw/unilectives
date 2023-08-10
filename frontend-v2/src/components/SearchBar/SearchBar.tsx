"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import FilterModal from "../FilterModal/FilterModal";
import { Course } from "@/types/api";

export default function SearchBar({ courses }: { courses: Course[] }) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: submit query
    console.log((event.target as HTMLFormElement).query.value);
  };
  const handleCourseChange = (updatedCourses: Course[]) => {
    // Handle the updated courses here
    console.log("Updated Courses: ", updatedCourses);
    setFilteredCourses(updatedCourses);
  };

  return (
    <div className="flex w-5/6 items-center bg-white rounded border-2 border-unilectives-search">
      <form className="flex px-2 items-center w-full" onSubmit={handleOnSubmit}>
        <button type="submit">
          <MagnifyingGlassIcon className="w-6 h-6 text-unilectives-search" />
        </button>
        <input
          type="text"
          name="query"
          className="w-full py-2 px-3 text-sm text-unilectives-search focus:outline-none placeholder-unilectives-search font-medium"
          placeholder="Search for a course e.g. COMP1511"
        />
      </form>
      <FilterModal courses={courses} onChange={handleCourseChange} />
    </div>
  );
}
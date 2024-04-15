"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import CoursesList from "../CoursesList/CoursesList";
import { useState } from "react";
import { Course } from "@/types/api";

export default function LandingPageContent({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleStateChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full duration-150'>
      <SearchBar onSearchChange={handleStateChange} />
      <CoursesList initialCourses={initialCourses} searchTerm={searchTerm} />
    </div>
  );
}

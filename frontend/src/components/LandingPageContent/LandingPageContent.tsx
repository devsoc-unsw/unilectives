"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import CoursesList from "../CoursesList/CoursesList";
import { useState } from "react";
import { Course } from "@/types/api";
import FilterModal from "../FilterModal/FilterModal";

export default function LandingPageContent({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ faculties: string[]; terms: string[] }>({
    faculties: [],
    terms: [],
  });

  const handleStateChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full duration-150'>
      <SearchBar 
        onSearchChange={handleStateChange} 
        onFilterClick={() => setIsFilterOpen(true)}
      />
      {isFilterOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setIsFilterOpen(false)} // close modal
          open={isFilterOpen}
        />
      )}

      <CoursesList
        initialCourses={initialCourses}
        searchTerm={searchTerm}
        filters={filters} // pass filters down to CoursesList
      />
    </div>
  );
}

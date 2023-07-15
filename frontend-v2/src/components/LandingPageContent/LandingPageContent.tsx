"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import CoursesList from "@/components/CoursesList/CoursesList";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

export default function LandingPageContent() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleStateChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full"> 
      <SearchBar onChange={handleStateChange}/>
      {searchTerm === "" ? <CoursesList /> : <SearchResults searchTerm={searchTerm}/>}
    </div>
  );
}
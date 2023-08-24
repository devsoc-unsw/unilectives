"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import { useState } from "react";
import CoursesList from "../CoursesList/CoursesList";

export default function LandingPageContent() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleStateChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full"> 
      <SearchBar onSearchChange={handleStateChange}/>
      <CoursesList searchTerm={searchTerm}/>
    </div>
  );
}
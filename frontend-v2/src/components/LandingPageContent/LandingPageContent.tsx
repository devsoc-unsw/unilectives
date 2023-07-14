"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import CoursesList from "@/components/CoursesList/CoursesList";
import { useState } from "react";

export default function LandingPageContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleStateChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full"> 
      <SearchBar onChange={handleStateChange}/>
      <CoursesList searchTerm={searchTerm}/>
    </div>
  );
}
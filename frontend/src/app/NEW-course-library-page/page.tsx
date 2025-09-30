// "use client";
import Image from "next/image";
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import navbar from "@/assets/navbar.svg";
import Sponsorships from "@/components/SponsorshipsSection/Sponsorships";
import { Metadata } from "next";
import { ItemList, WithContext } from "schema-dts";
import { get } from "@/utils/request";
import { Course, Courses } from "@/types/api";
import SearchBar from "@/components/SearchBar/SearchBar";

export default async function CourseLibraryPage() {
  const { courses: initialCourses } = (await get(
    "/courses?offset=0",
  )) as Courses;


  return (
    <div>
      {/* TOP OF PAGE */}
      {/* Title here */}
      <div className='flex flex-col w-full gap-3'>
        <h1 className='justify-center font-bold text-unilectives-blue text-5xl sm:text-4xl mt-28 ml-[6.25rem]'>
          Search Your Courses
        </h1>
      </div>

      {/* Course cards */}
      <div className="flex flex-col justify-center items-center mt-10">
        <LandingPageContent initialCourses={initialCourses} />
      </div>
      {/* BOTTOM OF PAGE */}
    </div>
  );
}

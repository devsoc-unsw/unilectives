import Image from "next/image";
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import navbar from "@/assets/navbar.svg";
import Sponsorships from "@/components/SponsorshipsSection/Sponsorships";
import { Metadata } from "next";
import { ItemList, WithContext } from "schema-dts";
import { get } from "@/utils/request";
import { Course, Courses } from "@/types/api";

export default async function CourseLibraryPage() {
  const { courses: initialCourses } = (await get(
    "/courses?offset=0",
  )) as Courses;

  return (
    <div>
      {/* TOP OF PAGE */}
      {/* Title here */}
      
      {/* Course cards */}
      <div className="flex flex-col justify-center items-center mt-10">
        <LandingPageContent initialCourses={initialCourses} />
      </div>
      {/* BOTTOM OF PAGE */}
    </div>
  );
}

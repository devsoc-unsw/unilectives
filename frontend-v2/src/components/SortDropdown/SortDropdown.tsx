"use client";

import Dropdown from "../Dropdown/Dropdown";
import { useMemo, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { Course } from "@/types/api";

export default function SortDropdown({
    courses,
    courseCode,
    title,
    rating,
    reviewCount,
    terms,
}: {
    courses: Course[];
    courseCode: string;
    title: string;
    rating: number;
    reviewCount: number;
    terms: number[];
}) {
    // States
    const [currentCourses, setCurrentCourses] = useState(courses);
    const [selected, setSelected] = useState("");

    // Change course sorting based on dropdown
    useMemo(() => {
        const sortedCourses = [...courses];

        switch (selected) {
            case "Alphabetical (A-Z)":
                sortedCourses.sort((c1: Course, c2: Course) =>
                    c1.title.localeCompare(c2.title)
                );
                break;
            case "Alphabetical (Z-A)":
                sortedCourses.sort(
                    (c1: Course, c2: Course) => c2.title.localeCompare(c1.title)
                );
                break;
            case "Overall Rating":
                sortedCourses.sort(
                    (c1: Course, c2: Course) => c2.overallRating - c1.overallRating
                );
                break;
            case "Enjoyability":
                sortedCourses.sort(
                    (c1: Course, c2: Course) => c2.enjoyability - c1.enjoyability
                );
                break;
            case "Usefulness":
                sortedCourses.sort(
                    (c1: Course, c2: Course) => c2.usefulness - c1.usefulness
                );
                break;
            case "Manageability":
                sortedCourses.sort(
                    (c1: Course, c2: Course) => c2.manageability - c1.manageability
                );
                break;
        }

        setCurrentCourses(sortedCourses);
    }, [selected, courses]);

    return (
        <div className="space-y-5 isolate w-full">
            <div className="flex-1 min-w-[150px] max-w-[200px] xs:min-w-full z-10">
                <Dropdown
                    options={[
                        "Alphabetical (A-Z)",
                        "Alphabetical (Z-A)",
                        "Overall Rating",
                        "Enjoyability",
                        "Usefulness",
                        "Manageability",
                    ]}
                    defaultValue={selected}
                    onChange={setSelected}
                    placeholder="Sort by"
                />
            </div>
            <div className="grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 mt-10 w-full items-center">
                {currentCourses.map((course) => (
                    <CourseCard
                        key={course.courseCode}
                        courseCode={course.courseCode}
                        title={course.title}
                        rating={course.rating}
                        reviewCount={course.reviewCount}
                        terms={course.terms}
                    />
                ))}
            </div>
        </div>
    );
}
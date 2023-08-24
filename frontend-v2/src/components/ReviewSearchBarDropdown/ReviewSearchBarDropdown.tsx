"use client";
import { Course } from "@/types/api";

export default function ReviewSearchbarDropdown({
  allCourses,
  loading,
}: {
  allCourses: Course[];
  loading: boolean;
}) {
  return (
    <>
      {allCourses.length && !loading ?
        <div
          className="absolute z-10 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full max-h-52 overflow-y-auto no-scrollbar"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div>
            {allCourses.map((course: Course) => (
              <a
                href={`/course/${course.courseCode}`}
                className="hover:bg-gray-200 text-gray-700 font-bold block px-4 py-2 text-sm"
                key={course.courseCode}>
                  {course.courseCode} - {course.title}
              </a>
            ))}
          </div>
        </div>
      : loading &&
        <div className="absolute z-10 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
          <p className="text-gray-700 font-bold block px-4 py-2 text-sm">Loading...</p>
        </div>
      }
    </>
  );
}
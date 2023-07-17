import { Course, Courses } from "@/types/api";
import TermsGroup from "../TermsGroup/TermsGroup";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function UserCourses({ courses }: Courses) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-1 gap-12">
      {courses.map((course: Course) => (
        <div className="box-border isolate px-6 py-7 bg-unilectives-card shadow-lg rounded-xl space-y-4">
          {/* Course courseCode */}
          <h1 className="text-2xl font-bold block truncate">
            {course.courseCode}
          </h1>
          {/* Course title */}
          <p className="text-unilectives-headings break-all line-clamp-3 h-[4.5rem]">
            {course.title}
          </p>
          {/* Terms */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <TermsGroup
              className="text-xs py-1 px-2 rounded-full bg-unilectives-tags"
              terms={course.terms}
            />
            {/* Icons */}
            <button className="duration-100 hover:text-unilectives-blue">
              <BookmarkIcon className="w-6 h-6 inline-block" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

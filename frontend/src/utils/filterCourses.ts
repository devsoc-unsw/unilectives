import { Course } from "@/types/api";

export type filterOptions = {
  faculty: string[];
  term: string[];
}

export function filterCourses(courses: Course[], options: filterOptions): Course[] {
  function termATOI(t: String) {
    switch (t.toLowerCase()) {
      case "summer":
        return 0;
      case "term 1":
        return 1;
      case "term 2":
        return 2;
      case "term 3":
        return 3;
      default:
        return -1;
    }
  }
  
  function applyFilter(course: Course, options: filterOptions) {
    if (options.faculty.length <= 0 || options.faculty.some((f) => course.faculty.includes(f))) {
      if (options.term.length <= 0 || options.term.some((t) => course.terms.includes(termATOI(t)))) {
        return true;
      }
    }
    return false;
  }
  
  const filteredCourses = courses.filter((course) => applyFilter(course, options));
  return filteredCourses;
}
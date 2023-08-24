import { Course, Courses } from "@/types/api";

export function sortCourses(courses: Course[], selected: string): Course[] {
    const sortedCourses = [...courses];

    switch (selected) {
        case "Alphabetical (A-Z)":
            sortedCourses.sort((c1: Course, c2: Course) =>
                c1.title.localeCompare(c2.title)
            );
            break;
        case "Alphabetical (Z-A)":
            sortedCourses.sort((c1: Course, c2: Course) =>
                c2.title.localeCompare(c1.title)
            );
            break;
        case "Overall Rating":
            sortedCourses.sort(
                (c1: Course, c2: Course) => c2.overallRating - c1.overallRating
            );
            break;
        case "Enjoyability":
            sortedCourses.sort((c1: Course, c2: Course) => c2.enjoyability - c1.enjoyability);
            break;
        case "Usefulness":
            sortedCourses.sort((c1: Course, c2: Course) => c2.usefulness - c1.usefulness);
            break;
        case "Manageability":
            sortedCourses.sort((c1: Course, c2: Course) => c2.manageability - c1.manageability);
            break;
    }

    return sortedCourses;
}

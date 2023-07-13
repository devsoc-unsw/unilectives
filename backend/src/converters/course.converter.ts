import { Course } from "../api/schemas/course.schema";
import { CourseEntity } from "../entity/Course";

export const convertCourseEntityToInterface = (
  entity: CourseEntity
): Course => {
  return {
    courseCode: entity.courseCode,
    archived: entity.archived,
    attributes: entity.attributes,
    calendar: entity.calendar,
    campus: entity.campus,
    description: entity.description,
    enrolmentRules: entity.enrolmentRules,
    equivalents: entity.equivalents,
    exclusions: entity.exclusions,
    faculty: entity.faculty,
    fieldOfEducation: entity.fieldOfEducation,
    genEd: entity.genEd,
    level: entity.level,
    school: entity.school,
    studyLevel: entity.studyLevel,
    terms: entity.terms,
    title: entity.title,
    uoc: entity.uoc,
    rating: entity.rating,
    reviewCount: entity.reviewCount,
    overallRating: entity.overallRating,
    manageability: entity.manageability,
    usefulness: entity.usefulness,
    enjoyability: entity.enjoyability,
  };
};

export const convertCourseInterfaceToEntity = (
  course: Course
): CourseEntity => {
  return {
    courseCode: course.courseCode,
    archived: course.archived,
    attributes: course.attributes,
    calendar: course.calendar,
    campus: course.campus,
    description: course.description,
    enrolmentRules: course.enrolmentRules,
    equivalents: course.equivalents,
    exclusions: course.exclusions,
    faculty: course.faculty,
    fieldOfEducation: course.fieldOfEducation,
    genEd: course.genEd,
    level: course.level,
    school: course.school,
    studyLevel: course.studyLevel,
    terms: course.terms,
    title: course.title,
    uoc: course.uoc,
    rating: course.rating,
    reviewCount: course.reviewCount,
    overallRating: course.overallRating,
    manageability: course.manageability,
    usefulness: course.usefulness,
    enjoyability: course.enjoyability,
    reviewsIds: [],
  };
};

export const convertRawCourseToInterface = (
  rawCourse
): Course => {
  return {
    courseCode: rawCourse.course_code,
    archived: rawCourse.archived,
    attributes: rawCourse.attributes,
    calendar: rawCourse.calendar,
    campus: rawCourse.campus,
    description: rawCourse.description,
    enrolmentRules: rawCourse.enrolment_rules,
    equivalents: rawCourse.equivalents,
    exclusions: rawCourse.exclusions,
    faculty: rawCourse.faculty,
    fieldOfEducation: rawCourse.field_of_education,
    genEd: rawCourse.gen_ed,
    level: rawCourse.level,
    school: rawCourse.school,
    studyLevel: rawCourse.study_level,
    terms: rawCourse.terms,
    title: rawCourse.title,
    uoc: rawCourse.uoc,
    rating: rawCourse.avg_overall_rating,
    overallRating: rawCourse.avg_overall_rating,
    manageability: rawCourse.avg_manageability,
    usefulness: rawCourse.avg_usefulness,
    enjoyability: rawCourse.avg_enjoyability,
    reviewCount: rawCourse.review_count,
  };
}
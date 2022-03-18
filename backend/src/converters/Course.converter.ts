import { ICourse } from "ICourse";
import { CourseEntity } from "../entity/Course";

export const convertCourseEntityToInterface = (
  entity: CourseEntity
): ICourse => {
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
  };
};

import { ICourse } from "ICourse";
import { UserEntity } from "../entity/User";
import { IUser } from "IUser";
import { CourseEntity } from "../entity/Course";

export const getCourseEntity = (): CourseEntity => {
  return {
    courseCode: "COMP1511",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description: "rip chee",
    enrolmentRules: "idk",
    equivalents: ["COMP1911"],
    exclusions: ["COMP1010"],
    faculty: "CSE",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "CSE",
    studyLevel: "ugrad",
    terms: [1, 2, 3],
    title: "good course imo",
    uoc: 6,
    rating: 4,
  };
};

export const getMockCourses = (): ICourse[] => {
  return [
    {
      courseCode: "COMP1511",
      archived: false,
      attributes: ["yeet"],
      calendar: "cal-123",
      campus: "Kensington",
      description: "rip chee",
      enrolmentRules: "idk",
      equivalents: ["COMP1911"],
      exclusions: ["COMP1010"],
      faculty: "CSE",
      fieldOfEducation: "ugrad",
      genEd: true,
      level: 1,
      school: "CSE",
      studyLevel: "ugrad",
      terms: [1, 2, 3],
      title: "good course imo",
      uoc: 6,
      rating: 4,
    },
    {
      courseCode: "COMP1531",
      archived: false,
      attributes: ["yeet"],
      calendar: "cal-123",
      campus: "Kensington",
      description: "hayden good",
      enrolmentRules: "idk",
      equivalents: ["COMP1911"],
      exclusions: ["COMP1010"],
      faculty: "CSE",
      fieldOfEducation: "ugrad",
      genEd: true,
      level: 1,
      school: "CSE",
      studyLevel: "ugrad",
      terms: [1, 2, 3],
      title: "good course imo",
      uoc: 6,
      rating: 4,
    },
  ];
};

export const getMockNewUser = (): IUser => {
  return {
    zid: "5555555",
    bookmarkedCourses: [],
    bookmarkedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getMockUser = (): IUser => {
  return {
    zid: "5555555",
    bookmarkedCourses: [
      {
        courseCode: "COMP1511",
        archived: false,
        attributes: ["yeet"],
        calendar: "cal-123",
        campus: "Kensington",
        description: "rip chee",
        enrolmentRules: "idk",
        equivalents: ["COMP1911"],
        exclusions: ["COMP1010"],
        faculty: "CSE",
        fieldOfEducation: "ugrad",
        genEd: true,
        level: 1,
        school: "CSE",
        studyLevel: "ugrad",
        terms: [1, 2, 3],
        title: "good course imo",
        uoc: 6,
        rating: 4,
      },
    ],
    bookmarkedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getUserEntity = (): UserEntity => {
  return {
    zid: "5555555",
    bookmarkedCourses: ["COMP1511"],
    bookmarkedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

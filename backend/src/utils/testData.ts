import { ICourse } from "ICourse";
import { UserEntity } from "../entity/User";
import { IUser } from "IUser";
import { CourseEntity } from "../entity/Course";
import { IReport } from "IReport";
import { ReportEntity } from "../entity/Report";
import { ReviewEntity } from "../entity/Review";
import { IReview } from "IReview";

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
    zid: "z5555555",
    bookmarkedCourses: [],
    bookmarkedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getMockUser = (): IUser => {
  return {
    zid: "z5555555",
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
    zid: "z5555555",
    bookmarkedCourses: ["COMP1511"],
    bookmarkedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getReportEntity = (): ReportEntity => {
  return {
    reportId: "REPORT1",
    review: getReviewEntity(),
    zid: "z5555555",
    reason: "Nothing makes sense",
    status: "UNSEEN",
  };
};

export const getMockReports = (): IReport[] => {
  return [
    {
      reportId: "REPORT1",
      review: getMockReview(),
      zid: "z5555555",
      reason: "Nothing makes sense",
      status: "UNSEEN",
    },
    {
      reportId: "REPORT2",
      review: getMockReview(),
      zid: "z5000000",
      reason: "There were rude words in the review!",
      status: "UNSEEN",
    },
  ];
};

export const getMockReview = (): IReview => {
  return {
    reviewId: "REVIEW1",
    zid: "z5555555",
    authorName: "test",
    description: "amazing",
  };
};

export const getReviewEntity = (): ReviewEntity => {
  return {
    reviewId: "REVIEW1",
    zid: "z5555555",
    authorName: "test",
    description: "amazing",
  };
};

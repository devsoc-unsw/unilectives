import { Course } from "../api/schemas/course.schema";
// import { UserEntity } from "../entity/User";
import { User } from "../api/schemas/user.schema";
import { Report } from "../api/schemas/report.schema";
// import { ReportEntity } from "../entity/Report";
// import { ReviewEntity } from "../entity/Review";
import { Review } from "../api/schemas/review.schema";

export const getCourseEntity = (): Course => {
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
    reviewCount: 1,
    overallRating: 4,
    manageability: 4,
    usefulness: 4,
    enjoyability: 4,
  };
};

export const getMockCourses = (): Course[] => {
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
      reviewCount: 1,
      overallRating: 4,
      manageability: 4,
      usefulness: 4,
      enjoyability: 4,
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
      reviewCount: 1,
      overallRating: 4,
      manageability: 4,
      usefulness: 4,
      enjoyability: 4,
    },
  ];
};

export const getMockNewUser = (): User => {
  return {
    zid: "z5555555",
    bookmarkedCourses: [],
    bookmarkedReviews: [],
    upvotedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getMockUser = (): User => {
  return {
    zid: "z5555555",
    bookmarkedCourses: ["COMP1511"],
    bookmarkedReviews: [],
    upvotedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getUserEntity = (): User => {
  return {
    zid: "z5555555",
    bookmarkedCourses: ["COMP1511"],
    bookmarkedReviews: [],
    upvotedReviews: [],
    isAdmin: false,
    reports: [],
    reviews: [],
  };
};

export const getReportEntity = (date = new Date()): Report => {
  return {
    reportId: "REPORT1",
    reviewId: getReviewEntity().reviewId,
    zid: "z5555555",
    reason: "Nothing makes sense",
    status: "UNSEEN",
    createdTimestamp: date,
    updatedTimestamp: date,
  };
};

export const getMockReports = (date = new Date()): Report[] => {
  return [
    {
      reportId: "REPORT1",
      reviewId: getMockReview(date).reviewId,
      zid: "z5555555",
      reason: "Nothing makes sense",
      status: "UNSEEN",
      createdTimestamp: date,
      updatedTimestamp: date,
    },
    {
      reportId: "REPORT2",
      reviewId: getMockReview(date).reviewId,
      zid: "z5000000",
      reason: "There were rude words in the review!",
      status: "UNSEEN",
      createdTimestamp: date,
      updatedTimestamp: date,
    },
  ];
};

export const getMockReview = (date = new Date()): Review => {
  return {
    reviewId: "REVIEW1",
    zid: "z5555555",
    authorName: "test",
    title: "my review1",
    description: "amazing",
    courseCode: "COMP1511",
    grade: 75,
    termTaken: "T1",
    createdTimestamp: date,
    updatedTimestamp: date,
    upvotes: ["z513131"],
    manageability: 3,
    enjoyability: 4,
    usefulness: 5,
    overallRating: 4.5,
  };
};

export const getReviewEntity = (date = new Date()): Review => {
  return {
    reviewId: "REVIEW1",
    zid: "z5555555",
    authorName: "test",
    title: "my review1",
    description: "amazing",
    courseCode: "COMP1511",
    grade: 75,
    termTaken: "T1",
    createdTimestamp: date,
    updatedTimestamp: date,
    upvotes: ["z513131"],
    manageability: 3,
    enjoyability: 4,
    usefulness: 5,
    overallRating: 4.5,
  };
};

export const getMockReviews = (date = new Date()): Review[] => {
  return [
    {
      reviewId: "REVIEW1",
      zid: "z5555555",
      authorName: "test",
      title: "my review1",
      description: "amazing",
      courseCode: "COMP1511",
      grade: 75,
      termTaken: "T1",
      createdTimestamp: date,
      updatedTimestamp: date,
      upvotes: ["z513131"],
      manageability: 3,
      enjoyability: 4,
      usefulness: 5,
      overallRating: 4.5,
    },
    {
      reviewId: "REVIEW2",
      zid: "z5555555",
      authorName: "test2",
      title: "my review2",
      description: "average",
      courseCode: "COMP2521",
      grade: 75,
      termTaken: "T2",
      createdTimestamp: date,
      updatedTimestamp: date,
      upvotes: ["z513131"],
      manageability: 3,
      enjoyability: 3,
      usefulness: 3,
      overallRating: 3,
    },
  ];
};

export const getMockCOMP2521Reviews = (date = new Date()): Review[] => {
  return [
    {
      reviewId: "REVIEW2",
      zid: "z5555555",
      authorName: "test2",
      title: "my review2",
      description: "average",
      courseCode: "COMP2521",
      grade: 75,
      termTaken: "T2",
      createdTimestamp: date,
      updatedTimestamp: date,
      upvotes: ["z513131"],
      manageability: 3,
      enjoyability: 3,
      usefulness: 3,
      overallRating: 3,
    },
  ];
};

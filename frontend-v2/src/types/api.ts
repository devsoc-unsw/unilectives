export type ApiError = {
  errorCode: string;
  errorMessage: string;
};

export type Review = {
  reviewId: string;
  courseCode: string;
  authorName: string;
  title: string;
  description: string;
  grade: number | null;
  termTaken: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  upvotes: string[];
  manageability: number;
  enjoyability: number;
  usefulness: number;
  overallRating: number;
};

export type Reviews = {
  reviews: Review[];
};

export type Course = {
  courseCode: string;
  archived: boolean;
  attributes: string[];
  calendar: string;
  campus: string;
  description: string;
  enrolmentRules: string;
  equivalents: string[];
  exclusions: string[];
  faculty: string;
  fieldOfEducation: string;
  genEd: boolean;
  level: number;
  school: string;
  studyLevel: string;
  terms: number[];
  title: string;
  uoc: number;
  reviewCount: number;
  overallRating: number;
  manageability: number;
  usefulness: number;
  enjoyability: number;
};

export type Courses = {
  courses: Course[];
}

export type Report = {
  reportId: string,
  review: Review,
  zid: string,
  status: "UNSEEN"| "SEEN"| "REMOVED"| "SETTLED",
  reason: string,
  createdTimestamp: string,
  updatedTimestamp: string,
}

export type Reports = {
  reports: Report[]
}
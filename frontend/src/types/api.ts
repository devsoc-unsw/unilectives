export type ApiError = {
  errorCode: string;
  errorMessage: string;
};

export type Review = ReviewNative | ReviewStudentVIP | ReviewUniNotes;

export type ReviewNative = {
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

export type ReviewStudentVIP = {
  reviewId: string;
  courseCode: string;
  authorName: string;
  title: string;
  description: string;
  termTaken: string;
  createdTimestamp: string;
  upvotes: string[];
  overallRating: number;
};

export type ReviewUniNotes = {
  reviewId: string;
  courseCode: string;
  authorName: string;
  title: string;
  description: string;
  termTaken: string;
  createdTimestamp: string;
  upvotes: string[];
  overallRating: number;
};

export type Reviews = {
  reviews: Review[];
};

export type ReviewsNative = {
  reviews: ReviewNative[];
};

export type ReportStatus = "UNSEEN" | "SEEN" | "REMOVED" | "SETTLED";

export type Report = {
  reportId: string;
  reviewId: string;
  zid: string;
  status: ReportStatus;
  reason: string;
  createdTimestamp: string;
  updatedTimestamp: string;
}

export type Reports = {
  reports: Report[];
}

export type UpdateReportStatusSchema = {
  reportId: string;
  zid: string;
  status: ReportStatus;
}

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

export type TabsType = {
  [key: string]: {
    current: boolean;
    data: Report[] | Review[] | Course[];
  };
};
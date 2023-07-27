export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface IRawCourse {
  course_code: string;
  archived: boolean;
  attributes: string[];
  calendar: string;
  campus: string;
  description: string;
  enrolment_rules: string;
  equivalents: string[];
  exclusions: string[];
  faculty: string;
  field_of_education: string;
  gen_ed: boolean;
  level: number;
  school: string;
  study_level: string;
  terms: number[];
  title: string;
  uoc: number;
  avg_overall_rating: number;
  avg_manageability: number;
  avg_usefulness: number;
  avg_enjoyability: number;
  review_count: number;
}

export interface IOldCourse {
  courseCode: string;
  attributes: string[];
  calendar: string;
  campus: string;
  description: string;
  enrolmentRules: string;
  equivalents: { [code: string]: 1 };
  exclusions: { [code: string]: 1 };
  faculty: string;
  fieldOfEducation: string;
  genEd: boolean;
  level: number;
  prerequisites: { [code: string]: 1 };
  school: string;
  studyLevel: string;
  terms: number[];
  title: string;
  uoc: number;
  reviews: string[];
}

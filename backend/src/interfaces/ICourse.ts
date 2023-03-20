export interface ICourse {
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
  prerequisites: string[];
  school: string;
  studyLevel: string;
  terms: number[];
  title: string;
  uoc: number;
  rating: number;
  reviewCount: number;
  overallRating: number;
  manageability: number;
  usefulness: number;
  enjoyability: number;
}

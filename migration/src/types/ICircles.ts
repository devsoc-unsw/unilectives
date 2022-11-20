export interface CirclesCourse {
  title: string;
  code: string;
  UOC: number;
  level: number;
  description: string;
  study_level: string;
  school: string;
  faculty: string;
  campus: string;
  equivalents: {
    [key: string]: string;
  };
  exclusions: { [key: string]: string };
  terms: string[];
  gen_ed: boolean;
  raw_requirements: string;
  is_multiterm: boolean;
  is_legacy: boolean;
}

export interface IRating {
  difficulty: number;
  enjoyment: number;
  overall: number;
  usefulness: number;
  workload: number;
}

export interface IOldReview {
  id: string;
  courseCode: string;
  title: string;
  comment: string;
  rating: IRating;
  termTaken: string;
  timestamp: number;
}

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

export interface IReview {
  reviewId: string;
  zid: string;
  courseCode: string;
  authorName: string;
  title: string;
  description: string;
  grade: string | null;
  termTaken: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  upvotes: string[];
  manageability: number;
  usefulness: number;
  enjoyability: number;
  overallRating: number;
}

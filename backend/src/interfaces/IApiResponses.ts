import { IReview } from "IReview";

export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface IPostNameRequestBody {
  name: string;
}

export interface IPostNameSuccessResponse {
  nameId: string;
  fullName: string;
}

export interface IGetReviewsSuccessResponse {
  reviews: IReview[];
}

/*
  ! Timestamps, upvotes or reviewId
*/ 
export interface IPostReviewRequestBody {
  zid: string;
  courseCode: string;
  authorName: string;
  description: string;
  grade: number;
  termTaken: string;
}

export interface IPostReviewSuccessResponse {
  review: IReview;
}
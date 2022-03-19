import { ICourse } from "ICourse";

export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface IGetCoursesSuccessResponse {
  courses: ICourse[];
}

export interface IPutCoursesRequestBody {
  course: ICourse;
}

export type IPutCoursesSuccessResponse = IPutCoursesRequestBody;

export interface IPostCoursesBookmarkRequestBody {
  courseCode: string;
  zid: string;
  bookmark: boolean;
}

export interface IPostCoursesBookmarkRequestBody {
  courseCode: string;
  zid: string;
  bookmark: boolean;
}

export type IPostCoursesBookmarkSuccessResponse = IPutCoursesSuccessResponse;

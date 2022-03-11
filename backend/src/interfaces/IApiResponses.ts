import { ICourse } from "ICourse";

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

export interface IGetCoursesSuccessResponse {
  courses: ICourse[];
}

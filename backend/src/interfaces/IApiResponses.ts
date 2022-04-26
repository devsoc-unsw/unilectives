import { ICourse } from "ICourse";
import { IUser } from "IUser";

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

export interface IPostUserSuccessResponse {
  user: IUser;
}

export interface IPostUserRequestBody {
  zid: string;
}

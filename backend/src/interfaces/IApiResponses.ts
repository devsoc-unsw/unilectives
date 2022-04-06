import { ICourse } from "ICourse";
import { IReport } from "IReport";
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

export interface IPostReportRequestBody {
  reviewId: string;
  zid: string;
  reason: string;
}

export interface IGetAllReportsSuccessResponse {
  reports: IReport[];
}

export interface IPostReportSuccessResponse {
  report: IReport;
}

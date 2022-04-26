import { ICourse } from "ICourse";
import { IReport, ReportStatus } from "IReport";
import { IUser } from "IUser";
import { ITokenData } from "IToken";

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

export interface IGetUserSuccessResponse {
  user: IUser;
}

export interface IPostUserSuccessResponse {
  user: IUser;
  token: ITokenData;
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

export interface IUpdateReportRequestBody {
  reportId: string;
  zid: string;
  status: ReportStatus;
}

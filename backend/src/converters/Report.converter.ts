import { ReportEntity } from "../entity/Report";
import { IReport } from "../interfaces/IReport";

export const convertReportEntityToInterface = (
  entity: ReportEntity
): IReport => {
  return {
    reportId: entity.reportId,
    reviewId: entity.reviewId,
    zid: entity.zid,
    reason: entity.reason,
    status: entity.status,
  };
};

export const convertReportInterfaceToEntity = (
  report: IReport
): ReportEntity => {
  return {
    reportId: report.reportId,
    reviewId: report.reviewId,
    zid: report.zid,
    reason: report.reason,
    status: report.status,
  };
};

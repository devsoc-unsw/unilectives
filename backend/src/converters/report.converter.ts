import { ReportEntity } from "../entity/Report";
import { Report } from "../api/schemas/report.schema";

export const convertReportEntityToInterface = (
  entity: ReportEntity
): Report => {
  return {
    reportId: entity.reportId,
    review: entity.review,
    zid: entity.zid,
    reason: entity.reason,
    status: entity.status,
    createdTimestamp: entity.createdTimestamp,
    updatedTimestamp: entity.updatedTimestamp,
  };
};

export const convertReportInterfaceToEntity = (
  report: Report
): ReportEntity => {
  return {
    reportId: report.reportId,
    review: report.review,
    zid: report.zid,
    reason: report.reason,
    status: report.status,
    createdTimestamp: report.createdTimestamp,
    updatedTimestamp: report.updatedTimestamp,
  };
};

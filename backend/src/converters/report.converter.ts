import { ReportEntity } from "../entity/Report";
import { ReportSchema } from "../api/schemas/report.schema";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./review.converter";
import { z } from "zod";

export const convertReportEntityToInterface = (
  entity: ReportEntity
): z.infer<typeof ReportSchema> => {
  return {
    reportId: entity.reportId,
    review: convertReviewEntityToInterface(entity.review),
    zid: entity.zid,
    reason: entity.reason,
    status: entity.status,
    createdTimestamp: entity.createdTimestamp,
    updatedTimestamp: entity.updatedTimestamp,
  };
};

export const convertReportInterfaceToEntity = (
  report: z.infer<typeof ReportSchema>
): ReportEntity => {
  return {
    reportId: report.reportId,
    review: convertReviewInterfaceToEntity(report.review),
    zid: report.zid,
    reason: report.reason,
    status: report.status,
    createdTimestamp: report.createdTimestamp,
    updatedTimestamp: report.updatedTimestamp,
  };
};

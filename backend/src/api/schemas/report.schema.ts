import { string, z } from "zod";
import { ReviewSchema } from "./review.schema";

export const CreateReportSchema = z
  .object({
    reviewId: z.string().uuid(),
    zid: z.string(),
    reason: z.string(),
  })
  .strict();

export const ReportStatusSchema = z.enum([
  "UNSEEN",
  "SEEN",
  "REMOVED",
  "SETTLED",
]);

export const UpdateReportStatusSchema = z
  .object({
    reportId: z.string().uuid(),
    zid: z.string(),
    status: ReportStatusSchema,
  })
  .strict();

export const ReportSchema = z
  .object({
    reportId: z.string(),
    review: ReviewSchema,
    zid: z.string(),
    status: ReportStatusSchema,
    reason: z.string(),
    createdTimestamp: z.date(),
    updatedTimestamp: z.date(),
  })
  .strict();

export const ReportSuccessResponse = z.object({
  report: ReportSchema,
});

export const ReportsSuccessResponse = z.object({
  reports: z.array(ReportSchema),
});

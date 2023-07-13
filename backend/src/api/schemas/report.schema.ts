import { z } from "zod";
import { ReviewSchema } from "./review.schema";

export const CreateReportSchema = z
  .object({
    reviewId: z.string().uuid(),
    zid: z.string(),
    reason: z.string(),
  })
  .strict();

export type CreateReport = z.infer<typeof CreateReportSchema>;

const ReportStatusSchema = z.enum(["UNSEEN", "SEEN", "REMOVED", "SETTLED"]);

export type ReportStatus = z.infer<typeof ReportStatusSchema>;

export const UpdateReportStatusSchema = z
  .object({
    reportId: z.string().uuid(),
    zid: z.string(),
    status: ReportStatusSchema,
  })
  .strict();

export type UpdateReportStatus = z.infer<typeof UpdateReportStatusSchema>;

export const ReportSchema = z
  .object({
    reportId: z.string(),
    reviews: ReviewSchema,
    zid: z.string(),
    status: ReportStatusSchema,
    reason: z.string(),
    createdTimestamp: z.date(),
    updatedTimestamp: z.date(),
  })
  .strict();

export type Report = z.infer<typeof ReportSchema>;

const ReportSuccessResponseSchema = z.object({
  report: ReportSchema,
});

export type ReportSuccessResponse = z.infer<typeof ReportSuccessResponseSchema>;

const ReportsSuccessResponseSchema = z.object({
  reports: z.array(ReportSchema),
});

export type ReportsSuccessResponse = z.infer<
  typeof ReportsSuccessResponseSchema
>;

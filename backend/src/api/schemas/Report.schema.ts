import { z } from "zod";

export const CreateReportSchema = z.object({
  reviewId: z.string().uuid(),
  zid: z.string(),
  reason: z.string(),
}).strict();

export const UpdateReportStatusSchema = z.object({
  reportId: z.string().uuid(),
  zid: z.string(),
  status: z.enum(["UNSEEN", "SEEN", "REMOVED", "SETTLED"]),
}).strict();

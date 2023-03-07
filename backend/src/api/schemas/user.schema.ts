import { z } from "zod";
import { CourseSchema } from "./course.schema";
import { ReportSchema } from "./report.schema";
import { ReviewSchema } from "./review.schema";

export const TokenDataSchema = z
  .object({
    expiresIn: z.string(),
    token: z.string(),
  })
  .strict();

export const CreateUserSchema = z
  .object({
    zid: z.string(),
  })
  .strict();

export const UserSchema = z
  .object({
    zid: z.string(),
    isAdmin: z.boolean(),
    bookmarkedCourses: z.array(CourseSchema),
    bookmarkedReviews: z.array(ReviewSchema),
    reports: z.array(ReportSchema),
    reviews: z.array(ReviewSchema),
  })
  .strict();

export const UserSuccessResponse = z
  .object({
    user: UserSchema,
  })
  .strict();

export const UserTokenSuccessResponse = z
  .object({
    user: UserSchema,
    token: TokenDataSchema,
  })
  .strict();

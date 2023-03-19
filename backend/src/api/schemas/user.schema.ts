import { z } from "zod";
import { CourseSchema } from "./course.schema";
import { ReportSchema } from "./report.schema";
import { ReviewSchema } from "./review.schema";

const TokenDataSchema = z
  .object({
    expiresIn: z.string(),
    token: z.string(),
  })
  .strict();

export type TokenData = z.infer<typeof TokenDataSchema>;

export const CreateUserSchema = z
  .object({
    zid: z.string(),
  })
  .strict();

export type CreateUser = z.infer<typeof CreateUserSchema>;

const UserSchema = z
  .object({
    zid: z.string(),
    isAdmin: z.boolean(),
    bookmarkedCourses: z.array(CourseSchema),
    bookmarkedReviews: z.array(ReviewSchema),
    reports: z.array(ReportSchema),
    reviews: z.array(ReviewSchema),
  })
  .strict();

export type User = z.infer<typeof UserSchema>;

const UserSuccessResponseSchema = z
  .object({
    user: UserSchema,
  })
  .strict();

export type UserSuccessResponse = z.infer<typeof UserSuccessResponseSchema>;

const UserTokenSuccessResponseSchema = z
  .object({
    user: UserSchema,
    token: TokenDataSchema,
  })
  .strict();

export type UserTokenSuccessResponse = z.infer<
  typeof UserTokenSuccessResponseSchema
>;

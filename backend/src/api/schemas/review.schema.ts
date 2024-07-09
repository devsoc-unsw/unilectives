import { title } from "process";
import { z } from "zod";

const CommonReviewSchema = z
  .object({
    userId: z.string().uuid(),
    widgets: z.array(
      z.object({
        widgetType: z.string().regex(/ARTICLE/),
        articleId: z.string().uuid(),
      }),
    ),
  })
  .strict();

export type CommonReview = z.infer<typeof CommonReviewSchema>;

export const PostReviewSchema = z
  .object({
    zid: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    grade: z.number().nullable(),
    courseCode: z.string(),
    termTaken: z.string(),
    manageability: z.number(),
    usefulness: z.number(),
    enjoyability: z.number(),
    overallRating: z.number(),
  })
  .strict();

export type PostReview = z.infer<typeof PostReviewSchema>;

export const BookmarkReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    bookmark: z.boolean(),
  })
  .strict();

export type BookmarkReview = z.infer<typeof BookmarkReviewSchema>;

export const UpvoteReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    upvote: z.boolean(),
  })
  .strict();

export type UpvoteReview = z.infer<typeof UpvoteReviewSchema>;

const PostReviewRequestBodySchema = z
  .object({
    zid: z.string(),
    courseCode: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    grade: z.number().nullable(),
    termTaken: z.string(),
    manageability: z.number(),
    usefulness: z.number(),
    enjoyability: z.number(),
    overallRating: z.number(),
  })
  .strict();

export type PostReviewRequestBody = z.infer<typeof PostReviewRequestBodySchema>;

export const PutReviewRequestBodySchema = z
  .object({
    authorName: z.string(),
    grade: z.number().nullable(),
  })
  .strict();

export type PutReviewRequestBody = z.infer<typeof PutReviewRequestBodySchema>;

export const ReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    courseCode: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    grade: z.number().nullable(),
    termTaken: z.string(),
    createdTimestamp: z.date(),
    updatedTimestamp: z.date(),
    upvotes: z.string().array(),
    manageability: z.number(),
    enjoyability: z.number(),
    usefulness: z.number(),
    overallRating: z.number(),
  })
  .strict();

export type Review = z.infer<typeof ReviewSchema>;

const ReviewSuccessResponseSchema = z
  .object({
    review: ReviewSchema,
  })
  .strict();

export type ReviewSuccessResponse = z.infer<typeof ReviewSuccessResponseSchema>;

const ReviewsSuccessResponseSchema = z
  .object({
    reviews: z.array(ReviewSchema),
  })
  .strict();

export type ReviewsSuccessResponse = z.infer<
  typeof ReviewsSuccessResponseSchema
>;

export const ReviewStudentVIPSchema = z
  .object({
    reviewId: z.string(),
    courseCode: z.string(),
    authorName: z.string(),
    title: z.string(),
    termTaken: z.string(),
    upvotes: z.string().array(),
    overallRating: z.number(),
  })
  .strict();

export type ReviewStudentVIP = z.infer<typeof ReviewStudentVIPSchema>;

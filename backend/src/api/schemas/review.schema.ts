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
    scraped: z.boolean(),
  })
  .strict();

export type BookmarkReview = z.infer<typeof BookmarkReviewSchema>;

export const UpvoteReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    upvote: z.boolean(),
    scraped: z.boolean(),
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

export const ReviewScrapedSchema = z
  .object({
    reviewId: z.string(),
    source: z.string(),
    sourceId: z.number(),
    courseCode: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    termTaken: z.string(),
    createdTimestamp: z.date(),
    upvotes: z.string().array(),
    overallRating: z.number(),
  })
  .strict();

const ReviewScrapedSuccessResponseSchema = z
  .object({
    review: z.array(ReviewScrapedSchema),
  })
  .strict();

export type ReviewScrapedSuccessResponse = z.infer<
  typeof ReviewScrapedSuccessResponseSchema
>;

const ReviewsScrapedSuccessResponseSchema = z
  .object({
    reviews: z.array(ReviewScrapedSchema),
  })
  .strict();

export type ReviewsScrapedSuccessResponse = z.infer<
  typeof ReviewsScrapedSuccessResponseSchema
>

const AllReviewSuccessResponseSchema = z
  .object({
    review: z.union([ReviewSchema, ReviewScrapedSchema]),
  })
  .strict()

export type AllReviewSuccessResponse = z.infer<
  typeof AllReviewSuccessResponseSchema
>
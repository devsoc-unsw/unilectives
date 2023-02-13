import { z } from "zod";

export const CommonReviewSchema = z
  .object({
    userId: z.string().uuid(),
    widgets: z.array(
      z.object({
        widgetType: z.string().regex(/ARTICLE/),
        articleId: z.string().uuid(),
      })
    ),
  })
  .strict();

export const PostReviewSchema = z
  .object({
    zid: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string(),
    courseCode: z.string(),
    rating: z.number(),
    termTaken: z.string(),
    manageability: z.number(),
    usefulness: z.number(),
    enjoyability: z.number(),
    overallRating: z.number(),
  })
  .strict();

export const BookmarkReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    bookmark: z.boolean(),
  })
  .strict();

export const UpvoteReviewSchema = z
  .object({
    reviewId: z.string(),
    zid: z.string(),
    upvote: z.boolean(),
  })
  .strict();

import { PrismaClient, reviews } from "@prisma/client";
import {
  PostReviewRequestBody,
  ReviewIdSchema,
} from "../api/schemas/review.schema";

export class ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllReviews(): Promise<reviews[]> {
    return await this.prisma.reviews.findMany();
  }

  async getCourseReviews(courseCode: string): Promise<reviews[]> {
    return await this.prisma.reviews.findMany({
      where: {
        courseCode,
      },
    });
  }

  async save(review: PostReviewRequestBody): Promise<reviews> {
    return await this.prisma.reviews.create({
      data: {
        ...review,
      },
    });
  }

  async update(review: {
    reviewId: string;
    grade: number | null;
    authorName: string;
  }) {
    return await this.prisma.reviews.update({
      where: {
        reviewId: review.reviewId,
      },
      data: {
        grade: review.grade,
        authorName: review.authorName,
      },
    });
  }

  async updateUpvotes(review: { reviewId: string; upvotes: string[] }) {
    return await this.prisma.reviews.update({
      where: {
        reviewId: review.reviewId,
      },
      data: {
        upvotes: review.upvotes,
      },
    });
  }

  async getReviewsByUser(zid: string): Promise<reviews[]> {
    return await this.prisma.reviews.findMany({
      where: {
        zid: zid,
      },
    });
  }

  async getReviewsById(reviewIds: string[]): Promise<reviews[]> {
    return await this.prisma.reviews.findMany({
      where: {
        reviewId: {
          in: reviewIds,
        },
      },
    });
  }

  async getReview(reviewId: string): Promise<reviews | null> {
    return await this.prisma.reviews.findUnique({
      where: {
        reviewId: reviewId,
      },
    });
  }

  async deleteReview(reviewId: string) {
    return await this.prisma.reviews.delete({
      where: {
        reviewId: reviewId,
      },
    });
  }

  async getMostLikedReview() {
    const rawReview = (await this.prisma.$queryRaw`
      SELECT
      r.review_id AS "reviewId"
      FROM reviews r
      ORDER BY array_length(r.upvotes, 1) DESC
      LIMIT 1;
    `) as any[];
    const reviewId = ReviewIdSchema.parse(rawReview[0]);
    return reviewId;
  }
}

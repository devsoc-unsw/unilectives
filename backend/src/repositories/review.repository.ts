import { PrismaClient, reviews, reviewsScraped } from "@prisma/client";
import {
  PostReviewRequestBody,
  ReviewSchema,
} from "../api/schemas/review.schema";

export class ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllReviews(): Promise<reviews[]> {
    return await this.prisma.reviews.findMany();
  }

  async getAllReviewsScraped(): Promise<reviewsScraped[]> {
    return await this.prisma.reviewsScraped.findMany();
  }

  async getCourseReviewsScraped(
    courseCode: string,
  ): Promise<reviewsScraped[]> {
    return await this.prisma.reviewsScraped.findMany({
      where: {
        courseCode,
      },
    });
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

  async updateScrapedUpvotes(review: { reviewId: string; upvotes: string[] }) {
    return await this.prisma.reviewsScraped.update({
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

  async getReviewScraped(reviewId: string): Promise<reviewsScraped | null> {
    return await this.prisma.reviewsScraped.findUnique({
      where: {
        reviewId: reviewId,
      },
    });
  }

  async getSourceReviewScrapedMaxId(source: string) {
    return await this.prisma.reviewsScraped.aggregate({
      where: {
        source: source
      },
      _max: {
        sourceId: true
      }
    })
  }

  async deleteReview(reviewId: string) {
    return await this.prisma.reviews.delete({
      where: {
        reviewId: reviewId,
      },
    });
  }

  async getMostLiked() {
    const rawReview = (await this.prisma.$queryRaw`
      SELECT
      r.review_id AS "reviewId",
      r.zid,
      r.course_code AS "courseCode",
      r.author_name AS "authorName",
      r.title,
      r.description,
      r.grade,
      r.term_taken AS "termTaken",
      r.created_timestamp AS "createdTimestamp",
      r.updated_timestamp AS "updatedTimestamp",
      r.upvotes,
      r.manageability,
      r.enjoyability,
      r.usefulness,
      r.overall_rating AS "overallRating"
      FROM reviews r
      ORDER BY cardinality(r.upvotes) DESC
      LIMIT 1;
    `) as any[];
    const review = ReviewSchema.parse(rawReview[0]);
    return review;
  }
}

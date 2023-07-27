import { ReviewRepository } from "../repositories/review.repository";
import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import { internalServerError, badRequest } from "../utils/constants";
import { UserRepository } from "../repositories/user.repository";
import RedisClient from "../modules/redis";
import {
  BookmarkReview,
  PostReviewRequestBody,
  PutReviewRequestBody,
  ReviewsSuccessResponse,
  ReviewSuccessResponse,
  UpvoteReview,
} from "../api/schemas/review.schema";
import { reviews } from "@prisma/client";

export class ReviewService {
  private logger = getLogger();
  constructor(
    private readonly redis: RedisClient,
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllReviews(): Promise<ReviewsSuccessResponse | undefined> {
    const reviews: reviews[] = await this.reviewRepository.getAllReviews();
    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    return {
      reviews: reviews,
    };
  }

  async getCourseReviews(
    courseCode: string,
  ): Promise<ReviewsSuccessResponse | undefined> {
    let reviews = await this.redis.get<reviews[]>(`reviews:${courseCode}`);

    if (!reviews) {
      this.logger.info(`Cache miss on reviews:${courseCode}`);
      reviews = await this.reviewRepository.getCourseReviews(courseCode);
      await this.redis.set(`reviews:${courseCode}`, reviews);
    } else {
      this.logger.info(`Cache hit on reviews:${courseCode}`);
    }

    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    this.logger.info(`Found ${reviews.length} reviews.`);
    return {
      reviews: reviews.map((review) => {
        return {
          ...review,
          courseCode,
        };
      }),
    };
  }

  async postReview(
    reviewDetails: PostReviewRequestBody,
  ): Promise<ReviewSuccessResponse | undefined> {
    // Convert reviewDetails to a reviewEntity
    const reviewEntity: PostReviewRequestBody = {
      zid: reviewDetails.zid,
      courseCode: reviewDetails.courseCode,
      authorName: reviewDetails.authorName,
      title: reviewDetails.title,
      description: reviewDetails.description,
      grade: reviewDetails.grade,
      termTaken: reviewDetails.termTaken,
      manageability: reviewDetails.manageability,
      usefulness: reviewDetails.usefulness,
      enjoyability: reviewDetails.enjoyability,
      overallRating: reviewDetails.overallRating,
    };

    const review = await this.reviewRepository.save(reviewEntity);

    const reviews = await this.reviewRepository.getCourseReviews(
      reviewDetails.courseCode,
    );
    await this.redis.set(`reviews:${reviewDetails.courseCode}`, reviews);

    return {
      review: {
        ...review,
        courseCode: reviewDetails.courseCode,
      },
    };
  }

  async updateReview(
    updatedReviewDetails: PutReviewRequestBody,
    reviewId: string,
  ): Promise<ReviewSuccessResponse | undefined> {
    // Get review entity by review id
    let review = await this.reviewRepository.getReview(reviewId);

    if (!review) {
      this.logger.error(`There is no review with reviewId ${reviewId}.`);
      throw new HTTPError(badRequest);
    }

    // Convert reviewDetails to a reviewEntity
    review.authorName = updatedReviewDetails.authorName;
    review.grade = updatedReviewDetails.grade;

    review = await this.reviewRepository.save(review);

    return {
      review: review,
    };
  }

  async deleteReview(reviewId: string) {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) {
      this.logger.error(`There is no review with reviewId ${reviewId}.`);
      throw new HTTPError(badRequest);
    }

    return await this.reviewRepository.deleteReview(review.reviewId);
  }

  async bookmarkReview(
    reviewDetails: BookmarkReview,
  ): Promise<ReviewSuccessResponse | undefined> {
    const review = await this.reviewRepository.getReview(
      reviewDetails.reviewId,
    );

    if (!review) {
      this.logger.error(
        `There is no course with courseCode ${reviewDetails.reviewId}.`,
      );
      throw new HTTPError(badRequest);
    }

    let user = await this.userRepository.getUser(reviewDetails.zid);

    if (!user) {
      this.logger.error(`There is no user with zid ${reviewDetails.zid}.`);
      throw new HTTPError(badRequest);
    }

    if (reviewDetails.bookmark) {
      user.bookmarkedReviews.push(review.reviewId);
    } else {
      user.bookmarkedReviews.filter(
        (review) => review !== reviewDetails.reviewId,
      );
    }

    user = await this.userRepository.saveUser(user);

    this.logger.info(
      `Successfully ${
        reviewDetails.bookmark ? "bookmarked" : "removed bookmarked"
      } review with reviewId ${reviewDetails.reviewId} for user with zID ${
        reviewDetails.zid
      }.`,
    );
    return {
      review: review,
    };
  }

  async upvoteReview(
    upvoteDetails: UpvoteReview,
  ): Promise<ReviewSuccessResponse | undefined> {
    let review = await this.reviewRepository.getReview(upvoteDetails.reviewId);

    if (!review) {
      this.logger.error(
        `There is no review with reviewId ${upvoteDetails.reviewId}.`,
      );
      throw new HTTPError(badRequest);
    }

    if (upvoteDetails.upvote) {
      review.upvotes = [...review.upvotes, upvoteDetails.zid];
    } else {
      review.upvotes.filter((zid) => zid !== upvoteDetails.zid);
    }

    review = await this.reviewRepository.save(review);

    this.logger.info(
      `Successfully ${
        upvoteDetails.upvote ? "upvoted" : "removed upvote from"
      } review with reviewId ${upvoteDetails.reviewId} for user with zID ${
        upvoteDetails.zid
      }.`,
    );

    return {
      review: review,
    };
  }
}

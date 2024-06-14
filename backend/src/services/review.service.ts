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
  Review,
  ReviewId,
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
    const review = await this.reviewRepository.update({
      ...updatedReviewDetails,
      reviewId,
    });

    const reviews = await this.reviewRepository.getCourseReviews(
      review.courseCode,
    );

    await this.redis.set(`reviews:${review.courseCode}`, reviews);

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

    await this.reviewRepository.deleteReview(review.reviewId);

    const reviews = await this.reviewRepository.getCourseReviews(
      review.courseCode,
    );

    await this.redis.set(`reviews:${review.courseCode}`, reviews);

    return "OK";
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

    const user = await this.userRepository.getUser(reviewDetails.zid);

    if (!user) {
      this.logger.error(`There is no user with zid ${reviewDetails.zid}.`);
      throw new HTTPError(badRequest);
    }

    if (!user.bookmarkedReviews) {
      user.bookmarkedCourses = [];
    }

    if (reviewDetails.bookmark) {
      user.bookmarkedReviews.push(review.reviewId);
    } else {
      user.bookmarkedReviews = user.bookmarkedReviews.filter(
        (review) => review !== reviewDetails.reviewId,
      );
    }

    await this.userRepository.updateUser({
      zid: user.zid,
      bookmarkedReviews: user.bookmarkedReviews,
    });

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

  async upvoteReview(upvoteDetails: UpvoteReview) {
    let review = await this.reviewRepository.getReview(upvoteDetails.reviewId);

    if (!review) {
      this.logger.error(
        `There is no review with reviewId ${upvoteDetails.reviewId}.`,
      );
      throw new HTTPError(badRequest);
    }

    if (upvoteDetails.upvote) {
      if (review.upvotes.includes(upvoteDetails.zid)) {
        this.logger.info(
          `Already upvoted for ${upvoteDetails.reviewId} and ${upvoteDetails.zid}`,
        );
        return {
          review,
        };
      }
      review.upvotes = [...review.upvotes, upvoteDetails.zid];
    } else {
      review.upvotes = review.upvotes.filter(
        (zid) => zid !== upvoteDetails.zid,
      );
    }

    review = await this.reviewRepository.updateUpvotes(review);

    const reviews = await this.reviewRepository.getCourseReviews(
      review.courseCode,
    );

    await this.redis.set(`reviews:${review.courseCode}`, reviews);

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

  async getMostLiked(): Promise<ReviewId | undefined> {
    const cachedReview = await this.redis.get<Review>(`review:mostLiked`);
    let review: Review | null;

    if (!cachedReview) {
      this.logger.info(`Cache miss on review:mostLiked`);
      review = await this.reviewRepository.getMostLiked();
      await this.redis.set(`review:mostLiked`, review);

      if (!review) {
        this.logger.error(`Could not find review with the most likes`);
        throw new HTTPError(badRequest);
      }
    } else {
      this.logger.info(`Cache hit on review:mostLiked`);
      review = cachedReview;
    }

    this.logger.info(
      `Sucessfully found review with reviewId ${review.reviewId} which contains the most votes`,
    );

    return {
      reviewId: review.reviewId,
    };
  }
}

import {v4 as uuidv4} from 'uuid';

import { 
  IGetReviewsSuccessResponse,
  IPostReviewRequestBody,
  IPutReviewRequestBody,
  IPostReviewSuccessResponse,
  IPutReviewSuccessResponse 
} from "IApiResponses";
import { ReviewRepository } from "../../repositories/Review.repository";
import { getLogger } from "../../utils/Logger";
import { ReviewEntity } from "../../entity/Review";
import { convertReviewEntityToInterface } from "../../converters/Review.converter";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, badRequest } from "../../utils/Constants";

export class ReviewService {
  private logger = getLogger();
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getAllReviews(): Promise<IGetReviewsSuccessResponse | undefined> {
    const reviews: ReviewEntity[] = await this.reviewRepository.getAllReviews();
    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    return {
      reviews: reviews.map(convertReviewEntityToInterface),
    };
  }

  async getCourseReviews(
    courseCode: string
  ): Promise<IGetReviewsSuccessResponse | undefined> {
    try {
      const reviews: ReviewEntity[] = await this.reviewRepository.getCourseReviews(
        courseCode
      );
      if (reviews.length === 0) {
        this.logger.error("Database returned with no reviews.");
        throw new HTTPError(internalServerError);
      }
      return {
        reviews: reviews.map(convertReviewEntityToInterface),
      };
    } catch {
      this.logger.warn(
        `An error occurred when trying to GET /reviews`
      );
    }
  }

  async postReview(
    reviewDetails: IPostReviewRequestBody
  ): Promise<IPostReviewSuccessResponse | undefined> {
    
    // Convert reviewDetails to a reviewEntity
    const reviewEntity = new ReviewEntity();
    reviewEntity.zid = reviewDetails.zid;
    reviewEntity.courseCode = reviewDetails.courseCode;
    reviewEntity.authorName = reviewDetails.authorName;
    reviewEntity.description = reviewDetails.description;
    reviewEntity.grade = reviewDetails.grade;
    reviewEntity.termTaken = reviewDetails.termTaken;

    // Review Entity fields not part of req body
    reviewEntity.upvotes = [];
    reviewEntity.createdTimestamp = new Date();
    reviewEntity.updatedTimestamp = new Date();
    reviewEntity.reviewId = uuidv4();

    const review = await this.reviewRepository.save(reviewEntity);
    
    return {
      review: convertReviewEntityToInterface(review)
    }
  }
  
  async updateReview(
    updatedReviewDetails: IPutReviewRequestBody,
    reviewId: string,
  ): Promise<IPutReviewSuccessResponse | undefined> {
    // Get review entity by review id
    let review = await this.reviewRepository.getReviewById(
      reviewId
    );

    if (!review) {
      this.logger.error(
        `There is no review with reviewId ${reviewId}.`
      );
      throw new HTTPError(badRequest);
    }

    // Convert reviewDetails to a reviewEntity
    const reviewEntity = new ReviewEntity();
    reviewEntity.zid = updatedReviewDetails.zid;
    reviewEntity.courseCode = updatedReviewDetails.courseCode;
    reviewEntity.authorName = updatedReviewDetails.authorName;
    reviewEntity.description = updatedReviewDetails.description;
    reviewEntity.grade = updatedReviewDetails.grade;
    reviewEntity.termTaken = updatedReviewDetails.termTaken;

    // Review Entity fields not part of req body but are updated
    reviewEntity.updatedTimestamp = new Date();

    review = await this.reviewRepository.save(reviewEntity);
    
    return {
      review: convertReviewEntityToInterface(review)
    }
  }

  async deleteReview(
    reviewId: string,
  ) {
    // Get review entity by review id
    let review = await this.reviewRepository.getReviewById(
      reviewId
    );

    if (!review) {
      this.logger.error(
        `There is no review with reviewId ${reviewId}.`
      );
      throw new HTTPError(badRequest);
    }
    
    return await this.reviewRepository.deleteReview(review.reviewId)
  }

  // Helper function

}
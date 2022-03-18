import { IGetReviewsSuccessResponse } from "IApiResponses";
import { ReviewRepository } from "../../repositories/Review.repository";
import { getLogger } from "../../utils/Logger";
import { ReviewEntity } from "../../entity/Review";
import { convertReviewEntityToInterface } from "../../converters/Review.converter";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";

export class ReviewService {
  private logger = getLogger();
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getReviews(): Promise<IGetReviewsSuccessResponse | undefined> {
    const reviews: ReviewEntity[] = await this.reviewRepository.getAllReviews();
    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    return {
      reviews: reviews.map(convertReviewEntityToInterface),
    };
  }
}
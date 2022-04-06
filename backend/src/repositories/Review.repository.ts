import { ReviewEntity } from "../entity/Review";
import { EntityManager, In } from "typeorm";

export class ReviewRepository {
  constructor(private readonly manager: EntityManager) {}

  async getAllReviews(): Promise<ReviewEntity[]> {
    return await this.manager.find(ReviewEntity);
  }

  async getReviewsByUser(zid: string): Promise<ReviewEntity[]> {
    return await this.manager.find(ReviewEntity, { where: { zid } });
  }

  async getReviewsById(reviewIds: string[]): Promise<ReviewEntity[]> {
    return await this.manager.findBy(ReviewEntity, {
      reviewId: In(reviewIds),
    });
  }

  async getReview(reviewId: string): Promise<ReviewEntity | null> {
    return await this.manager.findOneBy(ReviewEntity, {
      reviewId,
    });
  }
}

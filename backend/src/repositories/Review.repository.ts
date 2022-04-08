import { ReviewEntity } from "../entity/Review";
import { getRepository } from "typeorm";

export class ReviewRepository {
  async getAllReviews(): Promise<ReviewEntity[]> {
    return await getRepository(ReviewEntity).find();
  }
 
  async getCourseReviews(
    courseCode: string
  ): Promise<ReviewEntity[]> {
      return await getRepository(ReviewEntity).find({
        where: {
          courseCode 
        },
      });
  }

  async save(
    review: ReviewEntity
  ): Promise<ReviewEntity> {
    return await getRepository(ReviewEntity).save(review);
  }

  async getReviewById(
    reviewId: string
  ): Promise<ReviewEntity | undefined> {
    return await getRepository(ReviewEntity).findOne({ reviewId });
  }

  async deleteReview(
    reviewId: string
  ) {
    return await getRepository(ReviewEntity).delete({ reviewId });
  }

}
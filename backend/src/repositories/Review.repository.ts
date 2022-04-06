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

  async postReview(
    review: ReviewEntity
  ): Promise<ReviewEntity> {
    return await getRepository(ReviewEntity).save(review);
  }
}
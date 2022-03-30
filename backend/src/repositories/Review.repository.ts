import { ReviewEntity } from "../entity/Review";
import { getRepository } from "typeorm";

export class ReviewRepository {
  async getAllReviews(): Promise<ReviewEntity[]> {
    return await getRepository(ReviewEntity).find();
  }
 
  async getCourseReviews(
    courseCode: string
  ): Promise<ReviewEntity[]> {
    const reviews = await getRepository(ReviewEntity)
      .createQueryBuilder("reviews")
      .where(
        "review.course_code = :courseCode",
        { courseCode }
      )
      .getMany();

    return reviews;
  }

}
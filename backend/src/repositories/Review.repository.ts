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
        relations: ["reviews"],
        where: {
          courseCode 
        },
      });
  }
  // async getCourseReviews(
  //   courseCode: string
  // ): Promise<ReviewEntity[]> {
  //   const reviews = await getRepository(ReviewEntity)
  //     .createQueryBuilder("reviews")
  //     .where(
  //       "reviews.course_code::text = :code",
  //       { code: courseCode }
  //     )
  //     .getMany();
  //   return reviews;
  // }

  async postReview(
    review: ReviewEntity
  ): Promise<ReviewEntity> {
    return await getRepository(ReviewEntity).save(review);
  }
}
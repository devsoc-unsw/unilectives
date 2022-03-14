import { ReviewEntity } from "../entity/Review";
import { getRepository } from "typeorm";

export class ReviewRepository {
  async getAllReviews(): Promise<ReviewEntity[]> {
    return await getRepository(ReviewEntity).find();
  }
}
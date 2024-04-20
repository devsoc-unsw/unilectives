import { env } from "src/env";
import got from "got";
import { CirclesCourse } from "src/types/ICircles";
import { IReview } from "src/types/IReview";

export default class Fetcher {
  private readonly logger = console;

  async getCourses(): Promise<CirclesCourse[]> {
    try {
      const res = await got.get(`${env.CIRCLES_URL}/courses/dump`);
      const courses = JSON.parse(res.body) as CirclesCourse[];

      return courses;
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }

  async getProdReviews(): Promise<IReview[]> {
    try {
      const res = await got.get(
        "https://unilectives.csesoc.app/api/v1/reviews",
      );
      const reviews = JSON.parse(res.body);
      return reviews.reviews as IReview[];
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }
}
